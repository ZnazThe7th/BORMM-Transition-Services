'use client';

import React from 'react';
import {AnimatePresence, motion} from 'motion/react';
import {Check, Loader2, X} from 'lucide-react';

import {services, type Service} from '@/lib/services';
import type {ContactMethod, ValidationErrors} from '@/lib/bookings';

interface BookingModalProps {
  open: boolean;
  /** Pre-selected service. When null the user picks one inside the modal. */
  service: Service | null;
  onClose: () => void;
}

/**
 * Overlay + animated container. The actual form lives in `BookingForm`, which
 * is only mounted while the modal is open so its state initializes cleanly from
 * props on every open (no reset-in-effect needed).
 */
export function BookingModal({open, service, onClose}: BookingModalProps) {
  // Lock background scroll while open.
  React.useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  // Close on Escape.
  React.useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6"
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}
        >
          <button
            type="button"
            aria-label="Close booking dialog"
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-modal-title"
            className="relative z-10 w-full sm:max-w-lg max-h-[92vh] overflow-y-auto bg-white border border-[#E5E2DA] shadow-2xl rounded-t-2xl sm:rounded-none"
            initial={{y: 40, opacity: 0, scale: 0.98}}
            animate={{y: 0, opacity: 1, scale: 1}}
            exit={{y: 40, opacity: 0, scale: 0.98}}
            transition={{type: 'spring', stiffness: 320, damping: 30}}
          >
            <BookingForm service={service} onClose={onClose} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface BookingConfirmation {
  reference: string;
  serviceTitle: string;
  servicePrice: string;
}

interface FormState {
  serviceId: string;
  name: string;
  email: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  contactMethod: ContactMethod;
  message: string;
}

function initialForm(service: Service | null): FormState {
  return {
    serviceId: service ? String(service.id) : '',
    name: '',
    email: '',
    phone: '',
    preferredDate: '',
    preferredTime: '',
    contactMethod: 'zoom',
    message: '',
  };
}

interface BookingFormProps {
  service: Service | null;
  onClose: () => void;
}

function BookingForm({service, onClose}: BookingFormProps) {
  const [form, setForm] = React.useState<FormState>(() => initialForm(service));
  const [errors, setErrors] = React.useState<ValidationErrors>({});
  const [submitting, setSubmitting] = React.useState(false);
  const [formError, setFormError] = React.useState<string | null>(null);
  const [confirmation, setConfirmation] =
    React.useState<BookingConfirmation | null>(null);

  const firstFieldRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    const timer = window.setTimeout(() => firstFieldRef.current?.focus(), 60);
    return () => window.clearTimeout(timer);
  }, []);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({...prev, [key]: value}));
    setErrors((prev) => ({...prev, [key]: undefined}));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setFormError(null);
    setErrors({});

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          serviceId: form.serviceId ? Number(form.serviceId) : undefined,
          name: form.name,
          email: form.email,
          phone: form.phone,
          preferredDate: form.preferredDate,
          preferredTime: form.preferredTime,
          contactMethod: form.contactMethod,
          message: form.message,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.ok) {
        if (result.errors) setErrors(result.errors as ValidationErrors);
        setFormError(result.error ?? 'Something went wrong. Please try again.');
        return;
      }

      setConfirmation({
        reference: result.booking.reference,
        serviceTitle: result.booking.serviceTitle,
        servicePrice: result.booking.servicePrice,
      });
    } catch {
      setFormError(
        'We could not reach the server. Please check your connection and try again.',
      );
    } finally {
      setSubmitting(false);
    }
  };

  const selectedService =
    services.find((s) => String(s.id) === form.serviceId) ?? null;

  return (
    <>
      <div className="flex items-start justify-between px-6 pt-6 pb-4 border-b border-[#E5E2DA] sticky top-0 bg-white z-10">
        <div>
          <span className="block text-[10px] tracking-[0.3em] uppercase text-[#A19D94] mb-1">
            {confirmation ? 'Confirmed' : 'Sign Up'}
          </span>
          <h2
            id="booking-modal-title"
            className="text-2xl font-serif italic text-[#1A1A1A]"
          >
            {confirmation ? "You're all set" : 'Reserve your session'}
          </h2>
        </div>
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="p-2 -mr-2 text-[#A19D94] hover:text-[#1A1A1A] transition-colors"
        >
          <X className="w-5 h-5" strokeWidth={1.5} />
        </button>
      </div>

      {confirmation ? (
        <div className="px-6 py-10 text-center">
          <div className="mx-auto w-14 h-14 rounded-full bg-[#F0EEF7] flex items-center justify-center mb-5">
            <Check className="w-7 h-7 text-[#6B5A9E]" strokeWidth={2} />
          </div>
          <p className="text-lg font-semibold text-[#1A1A1A]">
            {confirmation.serviceTitle}
          </p>
          <p className="mt-1 text-sm text-[#777]">
            Thank you for signing up. We&apos;ll reach out shortly to confirm the
            details.
          </p>
          <div className="mt-6 inline-flex flex-col items-center gap-1 px-5 py-3 bg-[#F7F5F2] border border-[#E5E2DA]">
            <span className="text-[10px] uppercase tracking-widest text-[#A19D94]">
              Confirmation Reference
            </span>
            <span className="font-mono text-base font-bold text-[#6B5A9E] tracking-wider">
              {confirmation.reference}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="mt-8 w-full py-3 text-xs uppercase tracking-widest font-bold bg-black text-white hover:bg-[#333] transition-colors"
          >
            Done
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="px-6 py-6 space-y-5" noValidate>
          {selectedService && (
            <div className="flex items-center justify-between bg-[#F0EEF7] px-4 py-3 border border-[#E5E2DA]">
              <span className="text-sm font-semibold text-[#1A1A1A]">
                {selectedService.title}
              </span>
              <span className="text-lg font-serif text-[#6B5A9E]">
                {selectedService.price}
              </span>
            </div>
          )}

          <Field label="Service" error={errors.serviceId} htmlFor="serviceId">
            <select
              id="serviceId"
              name="serviceId"
              value={form.serviceId}
              onChange={(e) => update('serviceId', e.target.value)}
              className={selectClass(Boolean(errors.serviceId))}
            >
              <option value="">Select a service…</option>
              {services.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.title} — {s.price}
                </option>
              ))}
            </select>
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Full name" error={errors.name} htmlFor="name" required>
              <input
                ref={firstFieldRef}
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                value={form.name}
                onChange={(e) => update('name', e.target.value)}
                className={inputClass(Boolean(errors.name))}
                placeholder="Jordan Smith"
              />
            </Field>

            <Field label="Email" error={errors.email} htmlFor="email" required>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={(e) => update('email', e.target.value)}
                className={inputClass(Boolean(errors.email))}
                placeholder="you@example.com"
              />
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Phone (optional)" error={errors.phone} htmlFor="phone">
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                value={form.phone}
                onChange={(e) => update('phone', e.target.value)}
                className={inputClass(Boolean(errors.phone))}
                placeholder="(555) 123-4567"
              />
            </Field>

            <Field
              label="Preferred contact"
              error={errors.contactMethod}
              htmlFor="contactMethod"
            >
              <select
                id="contactMethod"
                name="contactMethod"
                value={form.contactMethod}
                onChange={(e) =>
                  update('contactMethod', e.target.value as ContactMethod)
                }
                className={selectClass(Boolean(errors.contactMethod))}
              >
                <option value="zoom">Zoom</option>
                <option value="phone">Phone</option>
              </select>
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              label="Preferred date (optional)"
              error={errors.preferredDate}
              htmlFor="preferredDate"
            >
              <input
                id="preferredDate"
                name="preferredDate"
                type="date"
                value={form.preferredDate}
                onChange={(e) => update('preferredDate', e.target.value)}
                className={inputClass(Boolean(errors.preferredDate))}
              />
            </Field>

            <Field
              label="Preferred time (optional)"
              error={errors.preferredTime}
              htmlFor="preferredTime"
            >
              <input
                id="preferredTime"
                name="preferredTime"
                type="time"
                value={form.preferredTime}
                onChange={(e) => update('preferredTime', e.target.value)}
                className={inputClass(Boolean(errors.preferredTime))}
              />
            </Field>
          </div>

          <Field
            label="What would you like help with? (optional)"
            error={errors.message}
            htmlFor="message"
          >
            <textarea
              id="message"
              name="message"
              rows={3}
              value={form.message}
              onChange={(e) => update('message', e.target.value)}
              className={`${inputClass(Boolean(errors.message))} resize-none`}
              placeholder="A sentence or two about your situation helps us prepare."
            />
          </Field>

          {formError && (
            <p
              role="alert"
              className="text-sm text-red-600 bg-red-50 border border-red-200 px-3 py-2"
            >
              {formError}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 text-xs uppercase tracking-widest font-bold bg-[#6B5A9E] text-white hover:bg-[#5A4B85] transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {submitting && (
              <Loader2 className="w-4 h-4 animate-spin" strokeWidth={2} />
            )}
            {submitting ? 'Submitting…' : 'Complete Sign Up'}
          </button>

          <p className="text-[10px] text-center text-[#A19D94] uppercase tracking-wider">
            No account required. We only use your details to schedule your
            session.
          </p>
        </form>
      )}
    </>
  );
}

interface FieldProps {
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}

function Field({label, htmlFor, error, required, children}: FieldProps) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="block text-[11px] uppercase tracking-wider font-bold text-[#1A1A1A] mb-1.5"
      >
        {label}
        {required && <span className="text-[#6B5A9E]"> *</span>}
      </label>
      {children}
      {error && (
        <p className="mt-1 text-xs text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

function inputClass(hasError: boolean): string {
  return [
    'w-full px-3 py-2 text-sm bg-white border text-[#2D2D2D]',
    'focus:outline-none focus:ring-2 focus:ring-[#6B5A9E]/40 focus:border-[#6B5A9E]',
    hasError ? 'border-red-400' : 'border-[#D1CEC7]',
  ].join(' ');
}

function selectClass(hasError: boolean): string {
  return `${inputClass(hasError)} appearance-none cursor-pointer`;
}
