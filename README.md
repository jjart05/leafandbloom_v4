# Leaf & Bloom

Premium botanical studio storefront built with React, Tailwind CSS, Framer Motion, and Lucide.

## Stack

- React 19 + TypeScript + Vite
- Tailwind CSS v4
- Framer Motion
- Lucide React
- React Router
- Vercel serverless functions for admin login (`/api/admin-*`)

Cart, wishlist, orders, and reviews persist in browser `localStorage` (`lb_cart`, `lb_wishlist`, `lb_orders`, `lb_reviews`). There is **no live payment gateway**.

## Scripts

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Environment variables

Copy `.env.example` to `.env.local` for local development. Set the same keys in Vercel → Project Settings → Environment Variables (Production + Preview).

| Name | Public? | Purpose |
|------|---------|---------|
| `ADMIN_PASSWORD` | **No** | Server-only admin gate |
| `ADMIN_SESSION_SECRET` | **No** | HMAC secret for HttpOnly session cookie |

Never use a `VITE_` prefix for these values.

## Routes

| Path | Page |
|------|------|
| `/` | Home |
| `/shop` | Product catalog |
| `/wishlist` | Saved plants |
| `/checkout` | Multi-step checkout |
| `/about` | Studio story |
| `/services` | Services |
| `/contact` | Contact |
| `/feedback` | Feedback |
| `/admin` | Admin dashboard (server-authenticated) |

Legacy static HTML (pre-React) is archived under `legacy/`.

## Deploy

Vercel builds with `npm run build`, publishes `dist`, applies SPA rewrites (excluding `/api/*`), and sets security headers via `vercel.json`.
