/**
 * Bookings API — the Node.js back-end for BORMM.
 *
 * Runs on the Node.js runtime (it touches the filesystem) and powers the
 * sign-up flow behind every "Book Now" / "Select Session" / "Join Monthly"
 * button. No authentication: this mirrors the public, login-free nature of the
 * service. A submission simply records the visitor's interest in a service.
 *
 *   POST /api/bookings  -> create a booking (sign-up)
 *   GET  /api/bookings  -> list bookings (lightweight admin view)
 */

import {NextResponse} from 'next/server';

import {createBooking, listBookings, validateBooking} from '@/lib/bookings';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      {ok: false, error: 'Request body must be valid JSON.'},
      {status: 400},
    );
  }

  const {valid, errors, data} = validateBooking(payload);
  if (!valid || !data) {
    return NextResponse.json(
      {ok: false, error: 'Please correct the highlighted fields.', errors},
      {status: 422},
    );
  }

  try {
    const booking = await createBooking(data);
    return NextResponse.json(
      {
        ok: true,
        message: `You're booked for ${booking.serviceTitle}. We'll reach out shortly to confirm.`,
        booking: {
          id: booking.id,
          reference: booking.reference,
          serviceTitle: booking.serviceTitle,
          servicePrice: booking.servicePrice,
          status: booking.status,
          createdAt: booking.createdAt,
        },
      },
      {status: 201},
    );
  } catch (error) {
    console.error('Failed to create booking:', error);
    return NextResponse.json(
      {ok: false, error: 'Something went wrong saving your request. Please try again.'},
      {status: 500},
    );
  }
}

export async function GET() {
  try {
    const bookings = await listBookings();
    return NextResponse.json({ok: true, count: bookings.length, bookings});
  } catch (error) {
    console.error('Failed to list bookings:', error);
    return NextResponse.json(
      {ok: false, error: 'Unable to load bookings.'},
      {status: 500},
    );
  }
}
