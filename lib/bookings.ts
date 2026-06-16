/**
 * Booking data layer (Node.js back-end).
 *
 * Handles validation and persistence of booking / sign-up requests submitted
 * from the front-end. Because BORMM is a "no login" live service, a booking is
 * simply a lightweight sign-up: the visitor picks a service and leaves their
 * contact details so the team can reach back out.
 *
 * Persistence is intentionally dependency-free: requests are appended to a JSON
 * file on disk. If the primary data directory is not writable (e.g. a read-only
 * serverless container), we transparently fall back to the OS temp directory so
 * the API never hard-fails on write.
 */

import {promises as fs} from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {randomUUID} from 'node:crypto';

import {getServiceById, type Service} from './services';

export type ContactMethod = 'phone' | 'zoom';

export interface BookingInput {
  serviceId: number;
  name: string;
  email: string;
  phone?: string;
  preferredDate?: string;
  preferredTime?: string;
  contactMethod?: ContactMethod;
  message?: string;
}

export interface Booking extends BookingInput {
  id: string;
  reference: string;
  serviceSlug: string;
  serviceTitle: string;
  servicePrice: string;
  status: 'pending';
  createdAt: string;
}

export type ValidationErrors = Partial<
  Record<keyof BookingInput | 'form', string>
>;

export interface ValidationResult {
  valid: boolean;
  errors: ValidationErrors;
  data?: BookingInput;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CONTACT_METHODS: ContactMethod[] = ['phone', 'zoom'];

const MAX_NAME = 120;
const MAX_EMAIL = 200;
const MAX_PHONE = 40;
const MAX_MESSAGE = 2000;

function asTrimmedString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

/**
 * Validates and normalizes an untrusted payload into a clean `BookingInput`.
 */
export function validateBooking(payload: unknown): ValidationResult {
  const errors: ValidationErrors = {};

  if (typeof payload !== 'object' || payload === null) {
    return {valid: false, errors: {form: 'Invalid request body.'}};
  }

  const body = payload as Record<string, unknown>;

  // Service
  const rawServiceId = body.serviceId;
  const serviceId =
    typeof rawServiceId === 'number'
      ? rawServiceId
      : Number.parseInt(asTrimmedString(rawServiceId), 10);
  let service: Service | undefined;
  if (!Number.isFinite(serviceId)) {
    errors.serviceId = 'Please choose a service.';
  } else {
    service = getServiceById(serviceId);
    if (!service) {
      errors.serviceId = 'The selected service is not available.';
    }
  }

  // Name
  const name = asTrimmedString(body.name);
  if (!name) {
    errors.name = 'Please enter your name.';
  } else if (name.length > MAX_NAME) {
    errors.name = `Name must be ${MAX_NAME} characters or fewer.`;
  }

  // Email
  const email = asTrimmedString(body.email);
  if (!email) {
    errors.email = 'Please enter your email address.';
  } else if (email.length > MAX_EMAIL || !EMAIL_REGEX.test(email)) {
    errors.email = 'Please enter a valid email address.';
  }

  // Phone (optional)
  const phone = asTrimmedString(body.phone);
  if (phone && phone.length > MAX_PHONE) {
    errors.phone = `Phone must be ${MAX_PHONE} characters or fewer.`;
  }

  // Contact method (optional)
  let contactMethod: ContactMethod | undefined;
  const rawContactMethod = asTrimmedString(body.contactMethod).toLowerCase();
  if (rawContactMethod) {
    if (CONTACT_METHODS.includes(rawContactMethod as ContactMethod)) {
      contactMethod = rawContactMethod as ContactMethod;
    } else {
      errors.contactMethod = 'Please choose phone or Zoom.';
    }
  }

  // Message (optional)
  const message = asTrimmedString(body.message);
  if (message.length > MAX_MESSAGE) {
    errors.message = `Message must be ${MAX_MESSAGE} characters or fewer.`;
  }

  const preferredDate = asTrimmedString(body.preferredDate) || undefined;
  const preferredTime = asTrimmedString(body.preferredTime) || undefined;

  if (Object.keys(errors).length > 0) {
    return {valid: false, errors};
  }

  return {
    valid: true,
    errors: {},
    data: {
      serviceId,
      name,
      email,
      phone: phone || undefined,
      preferredDate,
      preferredTime,
      contactMethod,
      message: message || undefined,
    },
  };
}

function dataDirCandidates(): string[] {
  const configured = process.env.BOOKINGS_DATA_DIR;
  const candidates = configured ? [configured] : [];
  candidates.push(path.join(process.cwd(), 'data'));
  candidates.push(path.join(os.tmpdir(), 'bormm-bookings'));
  return candidates;
}

const FILE_NAME = 'bookings.json';

async function resolveStoreFile(): Promise<string> {
  let lastError: unknown;
  for (const dir of dataDirCandidates()) {
    try {
      await fs.mkdir(dir, {recursive: true});
      const file = path.join(dir, FILE_NAME);
      // Probe writability without clobbering existing data.
      await fs.access(dir);
      return file;
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError instanceof Error
    ? lastError
    : new Error('Unable to resolve a writable bookings store.');
}

async function readBookings(file: string): Promise<Booking[]> {
  try {
    const raw = await fs.readFile(file, 'utf8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Booking[]) : [];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return [];
    }
    // Corrupt file: start fresh rather than crash the endpoint.
    return [];
  }
}

// Serialize read-modify-write operations within this process instance so
// concurrent requests can't corrupt the JSON file.
let writeChain: Promise<unknown> = Promise.resolve();

function withWriteLock<T>(task: () => Promise<T>): Promise<T> {
  const run = writeChain.then(task, task);
  // Keep the chain alive regardless of individual task outcomes.
  writeChain = run.then(
    () => undefined,
    () => undefined,
  );
  return run;
}

function buildReference(): string {
  const stamp = Date.now().toString(36).toUpperCase().slice(-5);
  const rand = Math.random().toString(36).toUpperCase().slice(2, 5);
  return `BORMM-${stamp}${rand}`;
}

/**
 * Persists a validated booking and returns the stored record.
 */
export async function createBooking(input: BookingInput): Promise<Booking> {
  const service = getServiceById(input.serviceId);
  if (!service) {
    throw new Error(`Unknown serviceId: ${input.serviceId}`);
  }

  const booking: Booking = {
    ...input,
    id: randomUUID(),
    reference: buildReference(),
    serviceSlug: service.slug,
    serviceTitle: service.title,
    servicePrice: service.price,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };

  return withWriteLock(async () => {
    const file = await resolveStoreFile();
    const bookings = await readBookings(file);
    bookings.push(booking);
    await fs.writeFile(file, JSON.stringify(bookings, null, 2), 'utf8');
    return booking;
  });
}

/**
 * Returns all stored bookings, newest first.
 */
export async function listBookings(): Promise<Booking[]> {
  const file = await resolveStoreFile();
  const bookings = await readBookings(file);
  return bookings.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}
