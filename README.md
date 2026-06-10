# Axerio Automation — Landing Page

Production landing page for [axerioautomation.com](https://axerioautomation.com).

Both URLs below serve the same site:
- **Primary domain:** https://axerioautomation.com
- **GitHub Pages fallback:** https://adityajamdade.github.io/axerio-automation/

---

## File structure

```
axerio-deploy/
├── index.html          ← Main landing page (no inline scripts)
├── presets.html        ← Preview builder: tiers, pricing, presets + live preview
├── onboarding.html     ← Details form, pre-filled with chosen tier + preset
├── robots.txt          ← Search engine crawl rules
├── sitemap.xml         ← Sitemap for SEO
├── CNAME               ← Tells GitHub Pages to serve axerioautomation.com
├── assets/
│   ├── logo.svg        ← Brand logo (SVG, silver + blue Axerio mark)
│   └── logo-3.0-zoomed-in-removebg.png  ← Favicon / OG image
├── css/
│   └── main.css        ← All styles for index.html
├── js/
│   ├── config.js       ← Edit THIS to update all content, links, and settings
│   ├── main.js         ← Runtime logic for index.html
│   └── presets.js      ← Tier + preset data and logic for presets.html (also supplies data to onboarding.html)
└── legal/
    ├── privacy-policy.html
    ├── terms-of-service.html
    ├── cookie-policy.html
    └── refund-policy.html
```

**Only ever edit `js/config.js`** to update site content, links, and settings.

### Phase 1 — Wedding Websites (Live)
User flow: `index.html` → `presets.html` (choose a tier, compare pricing, preview a preset) → `onboarding.html` (details form, pre-filled with the chosen tier + preset via `?tier=…&preset=…`).

`presets.html` shows all four tiers (Essential $397, Signature $697, Prestige $1,197, Elite $2,497) with their feature sets and the presets available to each (20 standard, +7 Prestige-exclusive, 4 Elite cinematic). Selecting a preset opens a styled mock-up rendered in that preset's real colours; **Proceed** carries the selection into `onboarding.html`. Tier/preset/pricing data lives in the `TIERS` and `PRESETS` arrays at the top of `js/presets.js` — edit there.

> The onboarding form is a scaffold: fields mirror the intake questionnaire and show/hide by tier, but submissions aren't wired to the backend yet (that's the next step).

### Phase 2 — AI Automation Services (Launching now..)
Full-suite AI platform for businesses: chatbots, lead automation, video marketing, and intelligent workflow management.

---

## Making updates

**Only ever edit `js/config.js`** — it controls all text, links, social handles, form settings, and reviews. After saving:

```bash
git add .
git commit -m "Update site content"
git push
```

GitHub Pages auto-deploys on every push to `main`. Changes go live in under 60 seconds.

---

## Configuring social links

Open `js/config.js` and fill in the `company` block:

```js
company: {
  email:     "hello@axerioautomation.com",
  whatsapp:  "https://wa.me/91XXXXXXXXXX",        // replace with real number
  instagram: "https://www.instagram.com/axerioautomation/",
  twitter:   "https://x.com/axerio1",
  linkedin:  "https://linkedin.com/company/axerioautomation",  // add your LinkedIn page URL
  youtube:   "https://www.youtube.com/@axerioautomation",      // add your YouTube channel URL
  logo:      "assets/logo.svg",
},
```

---

## Adding a contact form (Formspree — free)

1. Go to [formspree.io](https://formspree.io) → sign up free
2. Click **New Form** → give it a name → copy the form ID (e.g. `xbjnkwrz`)
3. In `js/config.js`, set:
   ```js
   form: { formspreeId: "xbjnkwrz", ... }
   ```
4. Push — form submissions now land in your inbox automatically.

Without a Formspree ID the Submit button falls back to opening the user's email client (`mailto:`).

---

## Adding client reviews

In `js/config.js`, add entries to the `testimonials` array:

```js
testimonials: [
  {
    quote:   "The website Axerio built for our wedding was absolutely breathtaking.",
    name:    "Priya & Rohan",
    role:    "Wedding in Mumbai, 2026",
    initial: "P",
  },
],
```

The **Reviews section is hidden by default** and appears automatically as soon as the array has at least one entry.

---

## How both URLs stay alive

GitHub Pages serves one repo on two addresses simultaneously:

| URL | How it works |
|-----|--------------|
| `https://axerioautomation.com` | Custom domain — configured via the `CNAME` file + DNS A records |
| `https://adityajamdade.github.io/axerio-automation/` | Default GitHub Pages URL — always works, no extra config |

Both are always live. The custom domain is the one to share publicly; the GitHub URL is a permanent fallback. You don't need to do anything extra to keep the GitHub URL working — it stays alive as long as the repo exists.

---

## First-time deploy to GitHub Pages

### 1. Create a GitHub repository

Go to [github.com/new](https://github.com/new) and create a **public** repo named `axerio-automation`.

### 2. Push this folder

Open a terminal inside the `axerio-deploy/` folder:

```bash
git init
git add .
git commit -m "Initial landing page"
git branch -M main
git remote add origin https://github.com/adityajamdade/axerio-automation.git
git push -u origin main
```

### 3. Enable GitHub Pages

1. Go to the repo on GitHub → **Settings** → **Pages**
2. Under **Source**, select `Deploy from a branch`
3. Branch: `main` / Folder: `/ (root)` → **Save**

The site is live at `https://adityajamdade.github.io/axerio-automation/` within ~60 seconds.

### 4. Point your custom domain (GoDaddy)

In your domain registrar, add these DNS records:

**A Records** (apex domain `axerioautomation.com`):
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

**CNAME Record** (www subdomain):
```
Type:  CNAME
Name:  www
Value: adityajamdade.github.io
```

### 5. Set the custom domain in GitHub Pages

In **Settings → Pages → Custom domain**, type:
```
axerioautomation.com
```
Click **Save**. GitHub provisions an SSL certificate automatically (usually under 10 minutes).

> **GoDaddy note:** Delete any legacy "WebsiteBuilder Site" A record if present — it conflicts with the GitHub IPs above.

### Done

Once DNS propagates (usually under 1 hour), the site is live at:
- **https://axerioautomation.com** (primary — share this one publicly)
- **https://adityajamdade.github.io/axerio-automation/** (permanent fallback — always works)
