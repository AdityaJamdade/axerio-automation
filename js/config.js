// ═══════════════════════════════════════════════════════════════════
//  AXERIO AUTOMATION — SITE CONFIGURATION
//
//  This is the ONLY file you need to edit to update the website.
//  After saving, push to GitHub — changes go live in ~60 seconds.
// ═══════════════════════════════════════════════════════════════════

window.SITE_CONFIG = {

  // ── COMPANY & CONTACT ─────────────────────────────────────────────
  company: {
    name:      "Axerio Automation",
    email:     "phase-one@axerioautomation.com",           // ← your business email
    instagram: "https://www.instagram.com/axerioautomation/",
    twitter:   "https://x.com/axerio1",
    linkedin:  "https://www.linkedin.com/in/axerio-automation-567118411/",
    youtube:   "https://www.youtube.com/@axerioautomation",     // ← paste your YouTube channel URL
    logo:      "assets/logo.svg",                        // logo file (svg or png)
  },

  // ── URLS ──────────────────────────────────────────────────────────
  //  Both URLs below point to the same site content.
  //  The CNAME file makes axerioautomation.com the primary domain.
  //  The GitHub Pages URL continues to work as a fallback automatically.
  urls: {
    primary:  "https://axerioautomation.com",
    github:   "https://adityajamdade.github.io/axerio-automation/",
  },

  // ── BACKEND API ───────────────────────────────────────────────────
  //  The platform-backend (Render) that stores onboarding intakes and
  //  contact enquiries in MongoDB. If your Render service has a different
  //  URL, change baseUrl below — that's the only edit needed.
  api: {
    //  Two backends: one for local dev, one for production. The page picks
    //  the right one automatically based on the host it's served from, so
    //  you never have to swap this by hand. Edit the URLs, not the logic.
    local:      "http://localhost:4000",                 // backend when running locally (npm start in backend-server)
    production: "https://platform-backend.onrender.com", // your deployed Render backend URL
    get baseUrl() {
      var h = (typeof location !== "undefined") ? location.hostname : "";
      var isLocal = (h === "localhost" || h === "127.0.0.1" || h === "");
      return isLocal ? this.local : this.production;
    },
  },

  // ── SEO / META TAGS ───────────────────────────────────────────────
  seo: {
    title:       "Axerio Automation — AI Automation Platform & Digital Experiences",
    description: "Axerio Automation builds AI-powered automation platforms and digital experiences with fast delivery, secure hosting, and tailored business workflows.",
    url:         "https://axerioautomation.com",
    image:       "https://axerioautomation.com/assets/logo-3.0-zoomed-in-removebg.png",
    twitterHandle: "@axerio1",
  },

  // ── HERO SECTION ──────────────────────────────────────────────────
  hero: {
    badge:      "Launching Phase 1 — Wedding Websites",
    titleLine1: "Intelligence That",
    titleLine2: "Builds Your World",
    subtitle:   "Axerio Automation creates stunning, AI-crafted wedding websites — delivered in 48 hours, live on your custom domain, and designed to tell your unique love story.",
  },

  // ── STATS BAR ─────────────────────────────────────────────────────
  stats: [
    { value: "48hr", label: "Average Delivery Time"    },
    { value: "100%", label: "AI-Powered Production"    },
    { value: "3×",   label: "Faster Than Traditional"  },
    { value: "∞",    label: "Customisation Options"    },
  ],

  // ── HOW IT WORKS (PROCESS STEPS) ──────────────────────────────────
  process: [
    {
      title: "Share Your Vision",
      desc:  "Tell us about your style, colours, theme, and the details that make your day unique.",
    },
    {
      title: "AI Design Magic",
      desc:  "Our AI generates a completely custom design tailored to your personality and preferences.",
    },
    {
      title: "Review & Refine",
      desc:  "You review the design, suggest tweaks, and we perfect every detail until you love it.",
    },
    {
      title: "Go Live",
      desc:  "Your website launches on your custom domain, ready to share with your guests worldwide.",
    },
  ],

  // ── CLIENT REVIEWS ────────────────────────────────────────────────
  //
  //  Leave this array empty → the reviews section is hidden automatically.
  //  Add real reviews here as you collect them.
  //
  //  Each review:
  //  {
  //    quote:   "What the client said about working with you.",
  //    name:    "Client Name",
  //    role:    "Context e.g. Product Launch in Mumbai, 2026",
  //    initial: "C",   ← first letter for the avatar circle
  //  }
  //
  testimonials: [
    // Example — uncomment and fill with real reviews when you have them:
    // {
    //   quote:   "The automation project Axerio delivered transformed our business.",
    //   name:    "Priya & Rohan",
    //   role:    "Product Launch in Mumbai, 2026",
    //   initial: "P",
    // },
  ],

  // ── CONTACT FORM ──────────────────────────────────────────────────
  //
  //  To receive form submissions straight to your inbox (free):
  //  1. Go to https://formspree.io → Sign up free
  //  2. Click "New Form" → give it a name → you'll get an ID like "xbjnkwrz"
  //  3. Paste that ID in formspreeId below
  //
  //  If formspreeId is left empty, clicking Submit opens a mailto: link instead.
  //
  form: {
    formspreeId: "xnjrzrlo",   // ← paste your Formspree form ID here e.g. "xbjnkwrz"
    services: [
      "Wedding Website (Phase 1)",
      "AI Automation Services (Phase 2 — Waitlist)",
      "AI Video Marketing",
      "Business Chatbot",
      "Something Else",
    ],
  },
};
