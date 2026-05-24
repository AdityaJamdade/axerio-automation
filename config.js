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
    email:     "hello@axerioautomation.com",     // ← your business email
    whatsapp:  "https://wa.me/91XXXXXXXXXX",      // ← replace with your number e.g. wa.me/919876543210
    instagram: "https://www.instagram.com/axerioautomation",
    linkedin:  "https://linkedin.com/company/axerioautomation",
    logo:      "assets/logo.svg",                 // logo file (svg or png)
  },

  // ── SEO / META TAGS ───────────────────────────────────────────────
  seo: {
    title:       "Axerio Automation — AI-Powered Digital Experiences",
    description: "Axerio Automation builds AI-powered digital experiences — from stunning wedding websites to full-scale business automation platforms.",
    url:         "https://axerioautomation.com",
  },

  // ── HERO SECTION ──────────────────────────────────────────────────
  hero: {
    badge:      "Launching Phase 1 — AI Wedding Websites",
    titleLine1: "Intelligence That",
    titleLine2: "Builds Your World",
    subtitle:   "Axerio Automation crafts AI-powered digital experiences — starting with breathtaking wedding websites, evolving into a full-scale business automation platform.",
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
  //    role:    "Context e.g. Wedding in Mumbai, 2026",
  //    initial: "C",   ← first letter for the avatar circle
  //  }
  //
  testimonials: [
    // Example — uncomment and fill with real reviews when you have them:
    // {
    //   quote:   "The website Axerio built for our wedding was absolutely breathtaking.",
    //   name:    "Priya & Rohan",
    //   role:    "Wedding in Mumbai, 2026",
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
    formspreeId: "",   // ← paste your Formspree form ID here e.g. "xbjnkwrz"
    services: [
      "Wedding Website",
      "AI Automation Waitlist",
      "AI Video Marketing",
      "Business Chatbot",
      "Something Else",
    ],
  },
};
