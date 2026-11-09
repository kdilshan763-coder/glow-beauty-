# Glow Beauty — Website (Static / GitHub Pages Edition)

A premium, fully responsive static website for **Glow Beauty**, a beauty salon in Horana, Sri Lanka.

> **What this is:** the complete public-facing website, ready to host free on GitHub Pages.
> **What this is not (yet):** the full booking platform with database, OTP login, owner dashboard,
> payments and loyalty — those require a backend (see "Roadmap" below).

---

## Pages

| Page | File |
|---|---|
| Home | `index.html` |
| About | `about.html` |
| Services & Pricing | `services.html` |
| Booking wizard | `booking.html` |
| Gallery | `gallery.html` |
| Beauty Blog | `blog.html` |
| Contact + FAQ | `contact.html` |
| Privacy Policy | `privacy.html` |
| Terms & Conditions | `terms.html` |
| Cancellation Policy | `cancellation.html` |

## How booking works on this static version

The booking wizard collects the client's choices and opens **WhatsApp** with a prefilled
message to the salon (**077 666 6666**). The salon confirms availability personally.
The same approach powers the enquiry form on the Contact page — every button does something real.

## Customise

- **Phone / WhatsApp:** search-and-replace `94776666666` (and `077 666 6666` for display).
- **Email:** replace `glowbeauty@gmail.com`.
- **Social links:** replace the `#` placeholders in the footer of each page.
- **Images:** swap the Unsplash URLs for your own salon photos (recommended before launch).
- **Hero video:** replace the `<source>` URL in `index.html`.

## Host it on GitHub (free)

1. Create a new repository on github.com (e.g. `glow-beauty`).
2. Upload all files in this folder to the repository (via "upload files" or git).
3. In the repository: **Settings → Pages → Source: Deploy from a branch → Branch: `main`, Folder: `/ (root)` → Save**.
4. Wait ~1 minute. Your site is live at `https://<your-username>.github.io/<repo-name>/`.
5. (Optional) Add a custom domain like `glowbeauty.lk` under **Settings → Pages → Custom domain**.

## Run locally

No build step. Just open `index.html` in a browser — or run `python -m http.server`
in this folder and visit `http://localhost:8000`.

## Brand tokens

Defined in `css/style.css` (`:root`): black `#0B0B0B`, gold `#C6A15B`, light gold `#E5CD91`,
cream `#F5F0E7`, ivory `#FFFDF8`. Typography: Playfair Display (headings) + Inter (body).

## Accessibility & performance

Semantic HTML, keyboard-friendly controls, reduced-motion support, lazy-loaded images,
SEO meta tags, and a WhatsApp floating action button on every page.

## Roadmap (full platform)

The complete system — real-time booking engine, SMS OTP login, customer accounts, owner
dashboard, payments, loyalty points, notifications — is planned as a Next.js + Supabase
application. This static site is Phase 1 of that journey: brand, content and a working
WhatsApp booking flow, live today at zero cost.
