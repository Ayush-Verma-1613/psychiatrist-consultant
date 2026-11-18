# MindWell — Psychiatrist Consultation Landing Page

A single-page, **frontend-only** landing page for a mental wellness practice.
Next.js App Router · TypeScript · Tailwind CSS · Framer Motion · React Hook Form + Zod.

## Running

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm start
```

## No backend

There are no API routes, no server actions, no database and no outbound network
calls. Everything runs in the browser:

| Feature | How it works |
| --- | --- |
| Booking modal | Local React state; availability generated deterministically in `lib/booking.ts` |
| Contact form | Validated with Zod, resolves against a local timer — nothing is sent |
| Articles / profiles / conditions | Open as in-page modals, no routing |
| Content | Static TypeScript files in `lib/data/` |

The only server-side piece is Next.js's built-in image optimiser (`/_next/image`),
which is framework infrastructure rather than application code. To deploy as a
pure static export, set `output: "export"` and `images.unoptimized: true` in
`next.config.ts`.

## Structure

```
app/            layout, page, global design-system CSS
components/     one component per section + ui/ primitives
lib/data/       all editable content (doctors, services, pricing, FAQ, …)
lib/images.ts   photography manifest — every URL verified to resolve
lib/booking.ts  Zod schemas + demo availability
```

## Demo content to replace before launch

All of the following is clearly labelled as sample content in the UI:

- **Doctor profiles** (`lib/data/doctors.ts`) — names, credentials, fees
- **Pricing** (`lib/data/pricing.ts`) — placeholder figures, not real fees
- **Testimonials** (`lib/data/testimonials.ts`) — illustrative, not real reviews
- **Contact details** (`lib/data/site.ts`) — address, phone and email placeholders
- **Trust stats** — descriptive labels only; no patient counts are claimed
- **Legal text** (`components/Footer.tsx`) — placeholder privacy/terms copy

Photography comes from Unsplash and is centralised in `lib/images.ts`.

## Accessibility & motion

Semantic landmarks, labelled form fields with inline errors, keyboard-dismissable
modals, visible focus rings, a skip link, and a global `prefers-reduced-motion`
block that disables animation and smooth scrolling.
