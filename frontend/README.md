# RIEAL H2O — Brand Website

A premium, production-quality marketing website for **RIEAL H2O**, a packaged
drinking water brand. Built as a lead-generation & brand site — **not** an
e-commerce store. React + Vite frontend with a tiny **Vercel serverless
function** for the contact form (Nodemailer over SMTP). Deploys cleanly to
Vercel.

- 5 fully-designed pages: Home, About Us, Our Water, Why RIEAL, Contact
- Modern hero with parallax, floating product bottle, animated water splash
- Scroll-reveal animations powered by IntersectionObserver + framer-motion
- Real RIEAL H2O logo & product photo used throughout
- Contact form → Nodemailer → **two emails**, **zero storage**:
  1. **Manager** gets the full enquiry (name, phone, email, city, message)
  2. **Client** gets an auto-reply with the manager's direct phone & email
- Sticky glass navbar with mobile drawer, semantic accessibility
- Fully responsive from 360px → 1920px

---

## 1. Requirements

- Node.js **18+** (20 LTS recommended)
- npm 9+
- A Gmail account (for sending emails via SMTP — free)

## 2. First-time setup

```bash
# 1. Install dependencies
npm install

# 2. Configure environment variables
cp .env.example .env
#   → edit .env and fill in SMTP creds + manager email/phone
```

## 3. Local development

```bash
npm run dev
# → http://localhost:5173  (frontend only)
```

> ⚠️ `npm run dev` runs Vite alone — the `/api/contact` serverless function
> does NOT run under Vite. To test the contact form locally, install the
> Vercel CLI and run `vercel dev` instead (see §7).

## 4. Production build

```bash
npm run build     # writes to dist/
npm run preview   # serves the built dist/
```

---

## 5. How the contact form works

There's no database, no third-party form service, no tracking. Just:

```
Client submits form
        │
        ▼
POST /api/contact   ← Vercel serverless function (Node + Nodemailer)
        │
        ├──► ✉️  Email to MANAGER_EMAIL — full enquiry + Reply-To client
        │
        └──► ✉️  Auto-reply to client   — thank-you + manager's direct number
```

Nothing is written to disk or a DB. The function reads the form body, sends
two emails via SMTP, and returns `{ ok: true }`. The frontend shows the
premium animated success screen with the manager's phone + email so the
client can call/email directly if they need a faster response.

## 6. Setting up Gmail SMTP (recommended)

Gmail SMTP is free, reliable and takes 2 minutes to set up:

1. **Enable 2-Step Verification** on the Gmail account you'll send from —
   https://myaccount.google.com/security → "2-Step Verification".
2. **Create an App Password** —
   https://myaccount.google.com/apppasswords → App: "Mail", Device: "Other",
   name it "RIEAL H2O website". Google will show you a **16-character
   password** — copy it (it disappears when you close the modal).
3. Fill in `.env` (and later, Vercel env vars):

   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=465
   SMTP_USER=your-sending-gmail@gmail.com
   SMTP_PASS=<the 16-char app password>
   MANAGER_EMAIL=where-enquiries-should-land@gmail.com
   MANAGER_NAME=Your Name
   MANAGER_PHONE=+91 98xxxxxxxx
   BUSINESS_ADDRESS=RIEAL H2O, Sri Anandpur sahib, Punjab, India
   ```

   `SMTP_USER` and `MANAGER_EMAIL` can be the same Gmail address, or
   different if you want the "from" address to be one inbox and the
   "delivered-to" address to be another.

Other SMTP providers work too (SendGrid, Mailgun, Zoho Mail, Brevo, etc.) —
just point `SMTP_HOST`/`SMTP_PORT`/`SMTP_USER`/`SMTP_PASS` at that provider.

---

## 7. Testing the form locally

Because `/api/contact` is a **Vercel serverless function**, it needs the
Vercel dev environment to run locally (Vite alone doesn't understand it):

```bash
npm i -g vercel        # one-time
vercel link            # link this folder to a Vercel project (or create one)
vercel env pull        # pulls the env vars from the linked project → .env
vercel dev             # runs Vite + serverless functions together
# → http://localhost:3000
```

Now the contact form actually sends real emails.

---

## 8. Deploying to Vercel

### Option A — Vercel dashboard (easiest)

1. Push the project to a Git repo (GitHub / GitLab / Bitbucket).
2. Import at https://vercel.com/new — Vercel auto-detects **Vite**.
3. **Environment variables** — under Project Settings → Environment Variables
   add every key from `.env.example` (Production **and** Preview):

   Server-side (SMTP — never expose):
   - `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`
   - `MANAGER_EMAIL`, `MANAGER_NAME`, `MANAGER_PHONE`
   - `BUSINESS_ADDRESS`

   Client-side (public — shown on the site):
   - `VITE_CONTACT_EMAIL`, `VITE_CONTACT_PHONE`, `VITE_CONTACT_ADDRESS`

4. Click **Deploy**. The `api/contact.js` file becomes a serverless
   function at `https://<your-site>.vercel.app/api/contact` automatically.

### Option B — Vercel CLI

```bash
npm i -g vercel
vercel login
vercel                       # first deploy (preview)
vercel --prod                # promote to production
```

Add env vars via CLI:

```bash
vercel env add SMTP_HOST         # then follow the prompts
vercel env add SMTP_PORT
vercel env add SMTP_USER
vercel env add SMTP_PASS
vercel env add MANAGER_EMAIL
vercel env add MANAGER_NAME
vercel env add MANAGER_PHONE
vercel env add BUSINESS_ADDRESS
vercel env add VITE_CONTACT_EMAIL
vercel env add VITE_CONTACT_PHONE
vercel env add VITE_CONTACT_ADDRESS
```

> **Never commit `.env`.** `.gitignore` already keeps it out. Real secrets
> live only in Vercel's Environment Variables UI.

---

## 9. Project structure

```
api/
└── contact.js                  # Vercel serverless function — Nodemailer

src/
├── App.jsx                     # Routes + layout
├── main.jsx                    # React entry
├── hooks/useDocumentTitle.js
├── components/
│   ├── Navbar.jsx / .css       # Sticky glass nav + mobile drawer
│   ├── Footer.jsx / .css
│   ├── Button.jsx / .css
│   ├── SectionHeading.jsx / .css
│   ├── FeatureCard.jsx  / .css
│   ├── ProductCard.jsx  / .css
│   ├── PillarCard.jsx   / .css
│   ├── ProcessStep.jsx  / .css
│   ├── Reveal.jsx       / .css
│   └── ScrollToTop.jsx
├── pages/
│   ├── Home.jsx / .css
│   ├── About.jsx / .css
│   ├── OurWater.jsx / .css
│   ├── WhyReal.jsx / .css
│   ├── Contact.jsx / .css      # Nodemailer form + animated success
│   └── NotFound.jsx / .css
├── data/
│   ├── siteConfig.js           # Brand strings, nav, contact, social
│   ├── features.js             # Trust row, pillars, water journey
│   └── products.js             # Pack sizes (informational only)
├── assets/
│   ├── images/
│   │   ├── logo.png            # Real RIEAL H2O logo
│   │   └── bottle.png          # Real RIEAL H2O bottle photo
│   └── svg/
│       ├── Logo.jsx            # Renders logo.png
│       ├── Bottle.jsx          # Renders bottle.png (large)
│       ├── BottleSmall.jsx     # Renders bottle.png (small)
│       ├── Jar20L.jsx          # 20L jar SVG
│       ├── HeroScene.jsx       # Mountain + sky + lake scene
│       ├── WaterSplash.jsx     # Decorative splash behind bottle
│       └── WaveDivider.jsx
└── styles/
    ├── variables.css           # Design tokens
    └── globals.css             # Reset + utilities
```

---

## 10. Editing content

- **Brand strings** (headline, tagline, CTAs, nav) → `src/data/siteConfig.js`
- **Business email / phone / address** (shown on the site) → env vars
  `VITE_CONTACT_EMAIL`, `VITE_CONTACT_PHONE`, `VITE_CONTACT_ADDRESS`
- **Pack sizes** → `src/data/products.js`
- **Trust row + pillars + water journey** → `src/data/features.js`
- **Manager email/phone for auto-replies** → env vars `MANAGER_*`

## 11. Swapping the logo / bottle images

Just replace `src/assets/images/logo.png` and `src/assets/images/bottle.png`
with your own files (keep the same filenames) and everything updates
across the site. For the bottle, the site uses `mix-blend-mode: multiply`
to erase the white product-shot background — so any PNG on a white
background will drop in cleanly without needing a transparent alpha.

## 12. Design tokens

Colors, fonts, spacing, radii and motion durations live as CSS custom
properties in `src/styles/variables.css`. Change a value there and it
propagates across the whole site.

Primary brand colors:
- Deep Navy `#062B66` · Royal Blue `#087FEF` · Light Blue `#DFF3FF`
- Very Light Blue `#F4FBFF` · White `#FFFFFF`

---

## 13. Cleaning up the leftover TypeScript scaffold

This project was scaffolded on top of a TypeScript starter. The switch to
JavaScript means these files are **no longer used** and can be safely
deleted:

```
src/App.tsx
src/App.css
src/main.tsx
src/index.css
tsconfig.json
tsconfig.app.json
tsconfig.node.json
vite.config.ts
.oxlintrc.json             (optional — remove if you're not using oxlint)
```

Delete the old `node_modules/` before `npm install` so the new deps
(`react-router-dom`, `lucide-react`, `framer-motion`, `nodemailer`) install
cleanly with React 18.

---

## 14. What's intentionally NOT here

Per the brief this is a brand / lead-generation website. There is no:
- Shopping cart / checkout / payment
- User accounts / login / signup
- Admin dashboard, order tracking
- Database or persistent storage — form data is emailed, then discarded
- Fake reviews, certifications, statistics, testimonials or logos

Enquiries flow through the Contact form → serverless function → Nodemailer
→ your inbox. That's it.
