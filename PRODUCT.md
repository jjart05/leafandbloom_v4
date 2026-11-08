# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary audience is portfolio reviewers — employers, clients, and peers evaluating front-end craft. They open the site to judge design quality, interaction polish, and implementation range, not to place a real order.

The site also performs a fictional customer journey (browse plants, cart, checkout, book services) so the portfolio piece reads as a complete luxury botanical commerce experience.

## Product Purpose

Leaf & Bloom is a static front-end portfolio project that demonstrates a full luxury botanical studio storefront: catalog, cart/checkout UI, services, about, contact, and feedback. Success means the site convincingly presents brand and commerce flows while clearly remaining a portfolio artifact — not a live commerce backend.

## Positioning

A Cebu-based luxury botanical studio narrative: premium plants, artisan florals, and botanical services (weddings, consultations, subscriptions, corporate styling) priced in Philippine pesos. Neighboring plant shops could sell greenery; this piece’s claim is curated luxury botanical artistry framed for Philippine audiences, shown through a polished multi-page shopping and services experience.

## Operating Context

Visited as a Vite + React SPA (`npm run dev` locally; production build on Vercel). Shopping cart, wishlist, checkout order requests, and feedback reviews are client-side only (`localStorage`). Enquiries are framed through contact forms and a WhatsApp CTA. Currency throughout is PHP (₱). Checkout never processes a real payment.

## Capabilities and Constraints

Confirmed site capabilities:

- Multi-page storefront: Home, About, Shop, Services, Checkout, Contact, Feedback, Admin
- Product catalog with categories, sorting/filtering, quick view, and cart drawer
- Checkout review UI (no live payment processing)
- Services lineup: floral arrangements, wedding & events, plant consultations, plant subscriptions, premium delivery, corporate styling
- Contact and feedback forms; theme toggle; responsive layouts

Constraints and undecided facts:

- Educational / portfolio project — not a production commerce system
- No real payment gateway, inventory backend, or order fulfillment
- Demo stats, satisfaction claims, and testimonials must not be treated as verified business evidence; future work must not invent stronger proof
- Contact phone (`+63 917 123 4567`) is placeholder until replaced with a real number
- Product imagery currently mixes local assets with Unsplash stock; do not present stock as owned photography without disclosure

## Brand Commitments

- Name: **Leaf & Bloom** — Luxury Botanical Studio
- Founder: Johnnel Artiaga (Founder & Lead Botanist); est. 2018 narrative
- Team names shown on About: Dave Del Rosario, R-Jyn Pantilag, Christian Orique
- Location: Buhisan, Dulhugan, Cebu City, Philippines
- Currency and market framing: Philippine peso; Philippines-facing delivery/services language
- Service categories listed above are part of the product story to preserve
- Logo mark: `images/leaf.svg` / `images/leaf.png`
- Personal social links currently wired on Contact (Instagram, Facebook, Pinterest, TikTok) belong to the founder; treat as binding only while they remain intentional

## Evidence on Hand

Real / local assets (paths under `images/`):

- Founder and team photos: `me.jpg`, `dave.jpg`, `arj1.jpg`, `iyan.jpg`
- Motion/hero media: `hero.mp4`, related hero stills
- Brand mark: `leaf.svg`, `leaf.png`
- Plant/decorative SVG and cutout assets under `images/plants/` and related SVGs

Not real evidence — do not fabricate or harden into claims:

- Homepage stats (species count, client count, satisfaction %)
- Testimonials stored in `js/script.js`
- Live payment, verified islandwide fulfillment, or third-party reviews
- Most catalog product photos (Unsplash URLs)

## Product Principles

1. Portfolio honesty first — craft can be ambitious; business claims must stay clearly demo-grade unless the owner supplies real proof.
2. Preserve the Leaf & Bloom identity — name, founder/team, Cebu roots, PHP, and service lineup are durable product facts.
3. Complete the fictional journey — shopping and services flows should feel coherent end-to-end even without a backend.
4. Prefer real local assets over invented proof when imagery or people are needed.
5. Prefer honest portfolio framing — interactive commerce UX without inventing payment backends or server auth.

## Accessibility & Inclusion

No product-specific accessibility standard was mandated beyond ordinary web good practice already started in the markup (landmarks, labels, cart live regions). Undecided: formal target (e.g. WCAG 2.2 AA) — record when chosen.
