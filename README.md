# Campus Academic Market (CAM)

A responsive Next.js 15 + React 19 academic support marketplace with GSAP animation, freemium/premium memberships, resource cards and Flutterwave Standard checkout.

## Stack
- Next.js App Router
- React 19 + TypeScript
- GSAP + ScrollTrigger
- Lucide icons
- Responsive CSS, no image dependency
- Flutterwave Standard server-side payment initialization + transaction verification
- Vercel-ready

## Run locally
```bash
npm install
cp .env.example .env.local
npm run dev
```
Open http://localhost:3000.

## Flutterwave
Add `FLW_SECRET_KEY` and `NEXT_PUBLIC_SITE_URL` to `.env.local` and later to Vercel Environment Variables. Never put the secret key in client code.

The payment route creates a Flutterwave Standard hosted checkout and the success page calls the server-side verification endpoint before showing a verified state.

## Vercel
Import the project into Vercel, select Next.js, and add the two environment variables. Deploy. The app is already configured with `vercel.json`.

## Important product note
CAM should provide tutoring, study resources, project guidance, formatting, research support and other legitimate academic assistance. Do not offer impersonation, falsified attendance, exam cheating or submission of work as if it were the student's own.

## Production next steps
1. Add authentication and student profiles.
2. Add a real database for orders, memberships, resource access and support tickets.
3. Add Flutterwave webhook handling and idempotency for production fulfillment.
4. Replace the demo WhatsApp number and email.
5. Add admin dashboard and inventory management for textbooks.
