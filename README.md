<!--- New, polished README for Dayta project -->

# Dayta — Mobile Data Dashboard

Dayta is a modern web dashboard for purchasing and managing mobile data bundles. It's built with the Next.js App Router, styled with Tailwind CSS, and integrates authentication (NextAuth/Clerk) and a backend API (FastAPI) for purchases and order status updates.

This README covers how to get the project running locally, development tips, environment configuration, and how to contribute.

---

## Quick overview

- Framework: Next.js (App Router)
- Styling: Tailwind CSS
- Auth: next-auth (Google OAuth) / optional Clerk integration
- HTTP client: axios
- Iconography: lucide-react
- Backend: FastAPI (separate service) — the frontend talks to the backend for payment/purchase endpoints

## Features

- Browse curated data bundles per network (AirtelTigo, MTN, Telecel)
- Select a bundle, enter recipient number and complete purchase
- Modal feedback and polling for order status (handles webhook timing delays)
- Responsive, dark-mode-aware UI

---

## Requirements

- Node.js 18+ (LTS recommended)
- npm (or yarn / pnpm)
- A running backend API (FastAPI) — in development this project expects it at `http://localhost:8080` by default

## Local setup (development)

Open PowerShell (Windows) or your preferred shell and run:

```powershell
# from repository root
npm install

# start the dev server (Next.js)
npm run dev
```

By default, the Next.js dev server starts on http://localhost:3000. Open that in your browser.

If you're using pnpm or yarn, replace the install and run commands accordingly:

```powershell
pnpm install
pnpm dev
# or
yarn install
yarn dev
```

## Important scripts

- `npm run dev` — start Next.js in development mode
- `npm run build` — production build
- `npm start` — start the built app
- `npm run lint` — run ESLint checks

These scripts come from `package.json`. If you need to change the dev server flags (Turbopack or not), adjust `package.json` accordingly.

## Environment variables

Create a `.env.local` file in the repository root and add the variables your environment requires. Example:

```env
# Next.js / next-auth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=some-long-random-string
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Backend API (FastAPI)
BACKEND_URL=http://localhost:8080

# Any other 3rd party keys used by your integrations
```

Note: The project contains references to `next-auth` in the frontend and a JWT-based exchange to the backend. Make sure your backend and auth provider are set up and that tokens are passed as expected.

## Backend (development)

The frontend expects a backend API to handle purchase requests and order status lookups. During development you can run the FastAPI server locally (not included in this repository). Confirm the backend's base URL and any required headers (CORS & JWT) using the `BACKEND_URL` environment variable.

If you control the backend, enable CORS for the frontend origin (http://localhost:3000) and ensure the webhook updates final order state quickly — the frontend waits a short grace period before showing final status to allow webhooks to finish.

## Common troubleshooting

- If the page fails to load, check the dev server console and browser devtools for the specific error.
- If the purchase flow returns 401/403, confirm auth tokens are present and valid. Inspect network requests and verify `Authorization` header is sent as `Bearer <token>`.
- If images or assets fail to load, confirm files exist under `public/` and paths in code (for example `/at.png`) are correct.
- Tailwind CSS not picking up changes? Ensure `tailwind.config.ts` includes `./src/**/*.{ts,tsx,js,jsx,tsx}` in the content option.

## Project structure (important files)

- `src/app/` — Next.js App Router pages and layouts
  - `dashboard/` — protected dashboard pages (retail flows for networks)
  - `login/page.tsx` — authentication page
  - `providers/AuthProvider.tsx` — auth wrapper used by dashboard
- `src/app/components/` — reusable UI components
- `src/lib/utils.ts` — helper utilities
- `public/` — static assets (icons, images)

## Contributing

1. Fork the repository and create a feature branch
2. Add tests where appropriate (a couple of quick integration tests help)
3. Open a PR with a clear description and steps to reproduce

Notes for maintainers:

- Consider standardizing on either `next-auth` or `@clerk/nextjs` if both are present to avoid duplication
- Add a `backend/` directory or subrepo for the FastAPI service (if you own it) and document how to run it together with the frontend

## Deployment

This app can be deployed to Vercel (recommended for Next.js). Ensure your environment variables are set in the Vercel project settings and the backend URL points to a reachable production-fastapi endpoint. If using Vercel serverless functions or proxies, make sure CORS and timeouts are handled.

## License

This repository doesn't include a license file. Add one if you plan to make the project public (for example, `MIT`).

---

## TODO

1. [ ] In the summary card the bundle shows (1GB (1MB)) fix that in the UI.
2. [ ] fix callback
3. [ ] find a better telecel image

Next steps(27/11/2025):

1. fix actual pricing
2. talk to team about wassce and bece checkers
3. talk to team about whatsapp bot and alot of data providers dilemma
4. talk to team about referal system/free data(if we choose to go with this whole idea in the first place)
5. deploy to vercel... think about domain names
6. make sure you fix the render cold boot by first pinging the server from layout.tsx the very moment the person opens the website. this will cause the server to boot up even before the person gets to the dashboard page.
7. add a database(excel) to store history and status of purchases
