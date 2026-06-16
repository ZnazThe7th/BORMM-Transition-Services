<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/ab69edba-7bc9-4e69-be56-6ea67948ef07

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Architecture

This app is a full-stack Next.js application — the front-end **and** the
back-end both run on Node.js in a single deployment. There is no separate
server to manage and no login: BORMM is a public, sign-up–style live service.

### Node.js back-end

The back-end is implemented with Next.js [Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
running on the Node.js runtime.

| Method | Endpoint        | Description                                              |
| ------ | --------------- | ------------------------------------------------------- |
| `POST` | `/api/bookings` | Create a booking / sign-up for a service.               |
| `GET`  | `/api/bookings` | List submitted bookings (lightweight admin view).       |

- **Shared catalog** — `lib/services.ts` is the single source of truth for the
  service offerings, imported by both the UI and the back-end.
- **Validation + persistence** — `lib/bookings.ts` validates submissions and
  stores them as JSON. The store lives in `data/bookings.json` by default and
  transparently falls back to the OS temp directory on read-only filesystems.
  Override the location with the `BOOKINGS_DATA_DIR` environment variable.

#### Example

```bash
curl -X POST http://localhost:3000/api/bookings \
  -H 'Content-Type: application/json' \
  -d '{"serviceId":1,"name":"Jordan Smith","email":"jordan@example.com","contactMethod":"zoom"}'
```

### Front-end

Every call-to-action button ("Book Now", "Select Session", "Join Monthly",
"Sign Up", "Schedule Appointment") opens a booking modal
(`components/booking-modal.tsx`) that submits to the back-end and shows a
confirmation reference on success.
