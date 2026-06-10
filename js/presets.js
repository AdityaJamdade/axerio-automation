// ══════════════════════════════════════════════════════════════════
//  AXERIO AUTOMATION — presets.js
//  Runtime logic + data for presets.html (the Preview Builder).
//
//  Flow:  pick a TIER  →  browse PRESETS for that tier  →
//         preview a styled mockup  →  Proceed to onboarding form
//         (carries ?tier=…&preset=… so the form arrives pre-filled).
//
//  No external dependencies.  Only data you may want to tweak lives
//  in the TIERS and PRESETS arrays below.
// ══════════════════════════════════════════════════════════════════

// ── TIERS ──────────────────────────────────────────────────────────
//  Pricing + feature copy mirrors _docs/phase-1-wedding/01-pricing-packages.md
//  `scope` decides which presets show:  'standard' | 'prestige' | 'elite'
// ──────────────────────────────────────────────────────────────────
const TIERS = [
  {
    id: 'essential',
    name: 'Essential',
    tagline: 'Your love story, beautifully told online',
    price: '$397',
    priceNote: 'Starting from',
    scope: 'standard',
    delivery: '3 business days',
    revisions: 2,
    presetLabel: '20 presets · 8 styles',
    sections: ['Hero', 'Our Story', 'Details', 'Gallery', 'RSVP'],
    bestFor: 'Couples who want a clean, modern invitation site without the extras.',
    features: [
      '5 beautifully designed sections',
      '20 curated presets · 8 design styles',
      '10 colour schemes · 6 font pairings',
      'Online RSVP with guest count + meal choices',
      'Full mobile responsiveness + scroll animations',
      '2 rounds of revisions',
    ],
  },
  {
    id: 'signature',
    name: 'Signature',
    tagline: 'The complete wedding companion your guests will love',
    price: '$697',
    priceNote: 'Starting from',
    scope: 'standard',
    delivery: '5 business days',
    revisions: 2,
    presetLabel: '20 presets · 8 styles',
    sections: ['Hero', 'Our Story', 'Details', 'Schedule', 'Gallery', 'Registry', 'Location', 'Stay', 'Music', 'FAQ', 'RSVP'],
    bestFor: 'Couples who want their guests to have everything in one beautiful place.',
    features: [
      'Everything in Essential, plus 6 more sections',
      'Live countdown timer',
      'Interactive map + transport notes',
      'Accommodation blocks with promo codes',
      'Guest song-request form + FAQ accordion',
      '2 rounds of revisions',
    ],
  },
  {
    id: 'prestige',
    name: 'Prestige',
    tagline: 'An experience as extraordinary as your wedding',
    price: '$1,197',
    priceNote: 'Starting from',
    scope: 'prestige',
    delivery: '7 business days',
    revisions: 3,
    presetLabel: '27 presets · incl. 7 exclusive',
    sections: ['Video Hero', 'Our Story', 'Details', 'Schedule', 'Gallery', 'Registry', 'Location', 'Stay', 'Music', 'FAQ', 'RSVP'],
    bestFor: 'Couples with a strong visual vision who want a truly luxury feel.',
    features: [
      'Everything in Signature, plus the drama',
      'Cinematic full-screen video hero',
      '3 exclusive styles: Aurora Glass, Velvet Night, Immersive 3D',
      '7 exclusive premium presets (21–27)',
      'Our own backend for form handling',
      '3 rounds of revisions',
    ],
  },
  {
    id: 'elite',
    name: 'Elite',
    tagline: 'The ultimate digital wedding experience',
    price: '$2,497',
    priceNote: 'Starting from',
    scope: 'elite',
    delivery: '10 business days',
    revisions: 3,
    presetLabel: '4 cinematic presets',
    sections: ['Hero', 'Our Story', 'Details', 'Schedule', 'Registry', 'Location', 'RSVP', 'FAQ'],
    bestFor: 'Couples who want something unmistakably high-end guests will talk about.',
    features: [
      '"The Room Before" — a bespoke cinematic build',
      '4 cinematic openings: candle · constellation · curtain · ink',
      'Three.js 3D hero with parallax + particles',
      'Buttery smooth scroll + custom cursor',
      'Gold-shimmer reveal animations + live countdown',
      '3 rounds of revisions',
    ],
  },
];

// ── PRESETS ────────────────────────────────────────────────────────
//  scope:  'standard'  → Essential, Signature, Prestige
//          'prestige'  → Prestige only (exclusive 21–27)
//          'elite'     → Elite only (4 cinematic)
//  palette: bg, accent, c2, c3, c4, text, heading  (exact hex from the
//           tier codebases' colorSchemes.js — accent=primary, c2=accent,
//           c3=secondary/surface, c4=textMuted)
//  font:    { name, heading, body } from the tier codebases' fontPairings.js
//  cats:    drive the style filter chips
// ──────────────────────────────────────────────────────────────────
const PRESETS = [
  // ── 20 standard (Essential / Signature / Prestige) ──────────────
  { key:'romanticBloom', num:'01', name:'Romantic Bloom', style:'Glassmorphism', vibe:'Classic, Dreamy, Timeless', season:'Spring / Summer', scope:'standard', cats:['light','glassmorphism'], font:{name:'Romantic', heading:'Cormorant Garamond', body:'Raleway'}, palette:{bg:'#FDFAF6', accent:'#C9A45A', c2:'#A0617A', c3:'#F5ECD7', c4:'#7A6A5A', text:'#3A2E28', heading:'#1A1210'} },
  { key:'blushCloud', num:'02', name:'Blush Cloud', style:'Claymorphism', vibe:'Playful, Soft, Modern', season:'Spring / Summer', scope:'standard', cats:['light','claymorphism'], font:{name:'Script', heading:'Cinzel', body:'EB Garamond'}, palette:{bg:'#FDF7F8', accent:'#D4828F', c2:'#E8B4BC', c3:'#FAF0F2', c4:'#8A6A70', text:'#3A2830', heading:'#2A1820'} },
  { key:'lavenderDreams', num:'03', name:'Lavender Dreams', style:'Neumorphism', vibe:'Delicate, Ethereal, Intimate', season:'All seasons', scope:'standard', cats:['light'], font:{name:'Script', heading:'Cinzel', body:'EB Garamond'}, palette:{bg:'#FAF8FE', accent:'#8B7BAB', c2:'#C4B4D8', c3:'#F2EEFF', c4:'#7A6A8A', text:'#2E2838', heading:'#1E1828'} },
  { key:'champagneToast', num:'04', name:'Champagne Toast', style:'Neumorphism', vibe:'Warm, Traditional, Upscale', season:'Fall / Winter', scope:'standard', cats:['light'], font:{name:'Classic', heading:'Cinzel Decorative', body:'Crimson Text'}, palette:{bg:'#FBF7EE', accent:'#B8965A', c2:'#D4B896', c3:'#F5EDDA', c4:'#7A6A50', text:'#3A3020', heading:'#1E1A10'} },
  { key:'crystalClear', num:'05', name:'Crystal Clear', style:'Liquid Glass', vibe:'Ethereal, Futuristic, Timeless', season:'All seasons', scope:'standard', cats:['light','minimal'], font:{name:'Classic', heading:'Cinzel Decorative', body:'Crimson Text'}, palette:{bg:'#FEFEFE', accent:'#1A1A1A', c2:'#C9A45A', c3:'#F5F0E8', c4:'#888888', text:'#2A2A2A', heading:'#000000'} },
  { key:'darkElegance', num:'06', name:'Dark Elegance', style:'Dark Academia', vibe:'Moody, Sophisticated, Luxurious', season:'Fall / Winter', scope:'standard', cats:['dark'], font:{name:'Editorial', heading:'Playfair Display', body:'Lora'}, palette:{bg:'#0D1526', accent:'#C9A45A', c2:'#6B8FBF', c3:'#1A2744', c4:'#8A9AB5', text:'#D4CBBA', heading:'#F0E6D3'} },
  { key:'midnightGold', num:'07', name:'Midnight Gold', style:'Glassmorphism', vibe:'Dramatic, Modern, Luxurious', season:'Fall / Winter', scope:'standard', cats:['dark','glassmorphism'], font:{name:'Editorial', heading:'Playfair Display', body:'Lora'}, palette:{bg:'#0D1526', accent:'#C9A45A', c2:'#6B8FBF', c3:'#1A2744', c4:'#8A9AB5', text:'#D4CBBA', heading:'#F0E6D3'} },
  { key:'boldRomance', num:'08', name:'Bold Romance', style:'Neo Brutalism', vibe:'Artistic, Confident, Unforgettable', season:'All seasons', scope:'standard', cats:['light','bold'], font:{name:'Bold', heading:'Space Grotesk', body:'Inter'}, palette:{bg:'#FBF6F4', accent:'#BC7E82', c2:'#D4A096', c3:'#F8EFED', c4:'#826060', text:'#3A2828', heading:'#221616'} },
  { key:'roseAndStone', num:'09', name:'Rose & Stone', style:'Dark Academia', vibe:'Intellectual, Moody, Editorial', season:'Fall', scope:'standard', cats:['light'], font:{name:'Editorial', heading:'Playfair Display', body:'Lora'}, palette:{bg:'#F5F7F9', accent:'#6B7B8D', c2:'#A8B4C0', c3:'#EEF1F4', c4:'#6A7A88', text:'#2A3038', heading:'#1A2028'} },
  { key:'boldMidnight', num:'10', name:'Bold Midnight', style:'Neo Brutalism', vibe:'Avant-garde, Polarizing, Memorable', season:'All seasons', scope:'standard', cats:['dark','bold'], font:{name:'Bold', heading:'Space Grotesk', body:'Inter'}, palette:{bg:'#0D1526', accent:'#C9A45A', c2:'#6B8FBF', c3:'#1A2744', c4:'#8A9AB5', text:'#D4CBBA', heading:'#F0E6D3'} },
  { key:'gardenParty', num:'11', name:'Garden Party', style:'Botanical', vibe:'Natural, Fresh, Organic', season:'Spring / Summer', scope:'standard', cats:['light','botanical'], font:{name:'Script', heading:'Cinzel', body:'EB Garamond'}, palette:{bg:'#F5FAF5', accent:'#7A9E7E', c2:'#A8C5A0', c3:'#EDF3EE', c4:'#6A7A6C', text:'#2A3A2C', heading:'#1A2A1C'} },
  { key:'emeraldForest', num:'12', name:'Emerald Forest', style:'Botanical', vibe:'Lush, Rich, Editorial', season:'All seasons', scope:'standard', cats:['light','botanical'], font:{name:'Editorial', heading:'Playfair Display', body:'Lora'}, palette:{bg:'#F5FBF7', accent:'#2D6A4F', c2:'#C9A45A', c3:'#EAF5EE', c4:'#5A7A68', text:'#1A2E24', heading:'#0D1E18'} },
  { key:'sageMinimal', num:'13', name:'Sage Minimal', style:'Minimalism', vibe:'Serene, Zen, Understated', season:'All seasons', scope:'standard', cats:['light','botanical','minimal'], font:{name:'Modern', heading:'DM Serif Display', body:'DM Sans'}, palette:{bg:'#F5FAF5', accent:'#7A9E7E', c2:'#A8C5A0', c3:'#EDF3EE', c4:'#6A7A6C', text:'#2A3A2C', heading:'#1A2A1C'} },
  { key:'tropicalModern', num:'14', name:'Tropical Modern', style:'Liquid Glass', vibe:'Fresh, Tropical, Contemporary', season:'Summer', scope:'standard', cats:['light','botanical'], font:{name:'Modern', heading:'DM Serif Display', body:'DM Sans'}, palette:{bg:'#F5FBF7', accent:'#2D6A4F', c2:'#C9A45A', c3:'#EAF5EE', c4:'#5A7A68', text:'#1A2E24', heading:'#0D1E18'} },
  { key:'sageAndClay', num:'15', name:'Sage & Clay', style:'Claymorphism', vibe:'Earthy, Playful, Grounded', season:'Fall / Spring', scope:'standard', cats:['light','botanical','claymorphism'], font:{name:'Romantic', heading:'Cormorant Garamond', body:'Raleway'}, palette:{bg:'#F5FAF5', accent:'#7A9E7E', c2:'#A8C5A0', c3:'#EDF3EE', c4:'#6A7A6C', text:'#2A3A2C', heading:'#1A2A1C'} },
  { key:'blushMinimal', num:'16', name:'Blush Minimal', style:'Minimalism', vibe:'Ultra-clean, Instagram-worthy', season:'All seasons', scope:'standard', cats:['light','minimal'], font:{name:'Modern', heading:'DM Serif Display', body:'DM Sans'}, palette:{bg:'#FDF7F8', accent:'#D4828F', c2:'#E8B4BC', c3:'#FAF0F2', c4:'#8A6A70', text:'#3A2830', heading:'#2A1820'} },
  { key:'dustyRomance', num:'17', name:'Dusty Romance', style:'Claymorphism', vibe:'Whimsical, Feminine, Story-book', season:'Spring / Fall', scope:'standard', cats:['light','claymorphism'], font:{name:'Script', heading:'Cinzel', body:'EB Garamond'}, palette:{bg:'#FBF6F4', accent:'#BC7E82', c2:'#D4A096', c3:'#F8EFED', c4:'#826060', text:'#3A2828', heading:'#221616'} },
  { key:'ivoryPoet', num:'18', name:'Ivory Poet', style:'Dark Academia', vibe:'Literary, Candlelit, Romantic', season:'Fall / Winter', scope:'standard', cats:['light'], font:{name:'Classic', heading:'Cinzel Decorative', body:'Crimson Text'}, palette:{bg:'#FBF7EE', accent:'#B8965A', c2:'#D4B896', c3:'#F5EDDA', c4:'#7A6A50', text:'#3A3020', heading:'#1E1A10'} },
  { key:'goldRush', num:'19', name:'Gold Rush', style:'Glassmorphism', vibe:'Opulent, Festive, High-end', season:'Fall / Winter', scope:'standard', cats:['light','glassmorphism'], font:{name:'Editorial', heading:'Playfair Display', body:'Lora'}, palette:{bg:'#FDFAF6', accent:'#C9A45A', c2:'#A0617A', c3:'#F5ECD7', c4:'#7A6A5A', text:'#3A2E28', heading:'#1A1210'} },
  { key:'modernLuxe', num:'20', name:'Modern Luxe', style:'Minimalism', vibe:'Sophisticated, Clean, Grown-up', season:'All seasons', scope:'standard', cats:['light','minimal'], font:{name:'Editorial', heading:'Playfair Display', body:'Lora'}, palette:{bg:'#FBF7EE', accent:'#B8965A', c2:'#D4B896', c3:'#F5EDDA', c4:'#7A6A50', text:'#3A3020', heading:'#1E1A10'} },

  // ── 7 Prestige exclusive (21–27) ────────────────────────────────
  { key:'cosmicLuxe', num:'21', name:'Cosmic Luxe', style:'Immersive 3D', vibe:'Celestial, Dramatic, Otherworldly', season:'All seasons', scope:'prestige', cats:['dark','prestige'], font:{name:'Editorial', heading:'Playfair Display', body:'Lora'}, palette:{bg:'#0A0818', accent:'#D4AF6A', c2:'#A889D4', c3:'#1A1430', c4:'#9A8EAE', text:'#E8E0F0', heading:'#F5EDD8'} },
  { key:'darkVelvet', num:'22', name:'Dark Velvet', style:'Velvet Night', vibe:'Sensual, Opulent, Intimate', season:'Fall / Winter', scope:'prestige', cats:['dark','prestige'], font:{name:'Classic', heading:'Cinzel Decorative', body:'Crimson Text'}, palette:{bg:'#0E0614', accent:'#C9A0DC', c2:'#D4AF6A', c3:'#1C0E2A', c4:'#9A78B0', text:'#EAD8F5', heading:'#F5EAFF'} },
  { key:'auroraWedding', num:'23', name:'Aurora Wedding', style:'Aurora Glass', vibe:'Ethereal, Iridescent, Magical', season:'Winter', scope:'prestige', cats:['dark','prestige'], font:{name:'Romantic', heading:'Cormorant Garamond', body:'Raleway'}, palette:{bg:'#060E1A', accent:'#6DD5D0', c2:'#A889D4', c3:'#0D1A2E', c4:'#7AACB0', text:'#D8EEF0', heading:'#E8F6F8'} },
  { key:'velvetRose', num:'24', name:'Velvet Rose', style:'Velvet Night', vibe:'Romantic, Mysterious, Lush', season:'Spring / Fall', scope:'prestige', cats:['dark','prestige'], font:{name:'Script', heading:'Cinzel', body:'EB Garamond'}, palette:{bg:'#0E0614', accent:'#C9A0DC', c2:'#D4AF6A', c3:'#1C0E2A', c4:'#9A78B0', text:'#EAD8F5', heading:'#F5EAFF'} },
  { key:'celestialDawn', num:'25', name:'Celestial Dawn', style:'Aurora Glass', vibe:'Cosmic, Hopeful, Luminous', season:'Summer', scope:'prestige', cats:['dark','prestige'], font:{name:'Modern', heading:'DM Serif Display', body:'DM Sans'}, palette:{bg:'#060E1A', accent:'#6DD5D0', c2:'#A889D4', c3:'#0D1A2E', c4:'#7AACB0', text:'#D8EEF0', heading:'#E8F6F8'} },
  { key:'starCrossed', num:'26', name:'Star Crossed', style:'Immersive 3D', vibe:'Romantic, Fated, Cinematic', season:'All seasons', scope:'prestige', cats:['dark','prestige'], font:{name:'Romantic', heading:'Cormorant Garamond', body:'Raleway'}, palette:{bg:'#0A0818', accent:'#D4AF6A', c2:'#A889D4', c3:'#1A1430', c4:'#9A8EAE', text:'#E8E0F0', heading:'#F5EDD8'} },
  { key:'crystalAurora', num:'27', name:'Crystal Aurora', style:'Aurora Glass', vibe:'Crystalline, Radiant, Ultra-premium', season:'Winter', scope:'prestige', cats:['dark','prestige'], font:{name:'Editorial', heading:'Playfair Display', body:'Lora'}, palette:{bg:'#0A0818', accent:'#D4AF6A', c2:'#A889D4', c3:'#1A1430', c4:'#9A8EAE', text:'#E8E0F0', heading:'#F5EDD8'} },

  // ── 4 Elite cinematic ───────────────────────────────────────────
  { key:'nocturne', num:'E1', name:'Nocturne', style:'Cinematic', vibe:'Candlelit, Editorial, Flagship', season:'Fall / Winter', scope:'elite', cats:['dark','cinematic'], font:{name:'Cormorant + Jost', heading:'Cormorant Garamond', body:'Jost'}, palette:{bg:'#1C1814', accent:'#C9A84C', c2:'#8B4C2F', c3:'#2A2520', c4:'#9C8E78', text:'#F2EBDF', heading:'#E8D5A8'} },
  { key:'ivory-editorial', num:'E2', name:'Ivory Editorial', style:'Cinematic', vibe:'Parchment, Champagne, Classical', season:'All seasons', scope:'elite', cats:['light','cinematic'], font:{name:'Cormorant + Jost', heading:'Cormorant Garamond', body:'Jost'}, palette:{bg:'#FAF8F4', accent:'#8A6B33', c2:'#6B4C3B', c3:'#EDEADE', c4:'#6B6253', text:'#2C2820', heading:'#1A1614'} },
  { key:'slate-modern', num:'E3', name:'Slate Modern', style:'Cinematic', vibe:'Architectural, Cool, Silver', season:'All seasons', scope:'elite', cats:['dark','cinematic'], font:{name:'Playfair + Inter', heading:'Playfair Display', body:'Inter'}, palette:{bg:'#1A1D24', accent:'#A8B4C8', c2:'#6080A0', c3:'#252830', c4:'#8890A0', text:'#E8E8F0', heading:'#D8DCE8'} },
  { key:'classic', num:'E4', name:'Classic', style:'Cinematic', vibe:'Old-world, Literary, Quiet', season:'All seasons', scope:'elite', cats:['light','cinematic'], font:{name:'EB Garamond + DM Sans', heading:'EB Garamond', body:'DM Sans'}, palette:{bg:'#FAF8F4', accent:'#8A6B33', c2:'#6B4C3B', c3:'#EDEADE', c4:'#6B6253', text:'#2C2820', heading:'#1A1614'} },
];

// ── STYLE FILTER CHIPS (per scope) ─────────────────────────────────
const STYLE_FILTERS = {
  standard: [
    { id:'all', label:'All' }, { id:'light', label:'Light' }, { id:'dark', label:'Dark' },
    { id:'glassmorphism', label:'Glass' }, { id:'minimal', label:'Minimal' },
    { id:'botanical', label:'Botanical' }, { id:'claymorphism', label:'Clay' }, { id:'bold', label:'Bold' },
  ],
  prestige: [
    { id:'all', label:'All 27' }, { id:'prestige', label:'Exclusive' },
    { id:'light', label:'Light' }, { id:'dark', label:'Dark' },
    { id:'glassmorphism', label:'Glass' }, { id:'minimal', label:'Minimal' }, { id:'botanical', label:'Botanical' },
  ],
  elite: [
    { id:'all', label:'All' }, { id:'light', label:'Light' }, { id:'dark', label:'Dark' },
  ],
};

// ── STATE ──────────────────────────────────────────────────────────
let activeTierId   = 'essential';
let activeFilter   = 'all';
let selectedPreset = null;

function currentTier() { return TIERS.find(t => t.id === activeTierId); }

function presetsForTier(tier) {
  if (tier.scope === 'elite')    return PRESETS.filter(p => p.scope === 'elite');
  if (tier.scope === 'prestige') return PRESETS.filter(p => p.scope === 'standard' || p.scope === 'prestige');
  return PRESETS.filter(p => p.scope === 'standard');
}

// ── RENDER: TIER CARDS ─────────────────────────────────────────────
function buildTiers() {
  const wrap = document.getElementById('tier-cards');
  if (!wrap) return;
  wrap.innerHTML = TIERS.map(t => `
    <button class="tier-card${t.id === activeTierId ? ' active' : ''}" data-tier="${t.id}" type="button">
      <div class="tier-card-top">
        <span class="tier-name">${t.name}</span>
        <span class="tier-price"><small>${t.priceNote}</small>${t.price}</span>
      </div>
      <p class="tier-tagline">${t.tagline}</p>
      <p class="tier-presetcount">${t.presetLabel}</p>
    </button>`).join('');
}

// ── RENDER: SELECTED-TIER DETAIL PANEL ─────────────────────────────
function buildTierDetail() {
  const t = currentTier();
  const el = document.getElementById('tier-detail');
  if (!el) return;
  el.innerHTML = `
    <div class="td-head">
      <div>
        <h2 class="td-name">${t.name}</h2>
        <p class="td-tagline">${t.tagline}</p>
      </div>
      <div class="td-price">
        <small>${t.priceNote}</small>
        <span>${t.price}</span>
        <em>${t.delivery} · ${t.revisions} revision rounds</em>
      </div>
    </div>
    <ul class="td-features">
      ${t.features.map(f => `<li>${f}</li>`).join('')}
    </ul>
    <div class="td-sections">
      <span class="td-sections-label">Sections included</span>
      <div class="td-section-pills">
        ${t.sections.map(s => `<span class="sec-pill">${s}</span>`).join('')}
      </div>
    </div>
    <p class="td-bestfor"><strong>Best for:</strong> ${t.bestFor}</p>`;
}

// ── RENDER: STYLE FILTER BAR ───────────────────────────────────────
function buildFilters() {
  const t = currentTier();
  const wrap = document.getElementById('filter-wrap');
  if (!wrap) return;
  const filters = STYLE_FILTERS[t.scope] || STYLE_FILTERS.standard;
  if (!filters.some(f => f.id === activeFilter)) activeFilter = 'all';
  wrap.innerHTML = filters.map(f =>
    `<button class="filter-btn${f.id === activeFilter ? ' active' : ''}" data-filter="${f.id}" type="button">${f.label}</button>`
  ).join('');
}

// ── RENDER: PRESET GRID ────────────────────────────────────────────
function buildGrid() {
  const t = currentTier();
  const grid = document.getElementById('presets-grid');
  if (!grid) return;
  const list = presetsForTier(t);

  grid.innerHTML = list.map(p => {
    ensureFont(p.font.heading);
    const visible = activeFilter === 'all' || p.cats.includes(activeFilter);
    const exclusive = p.scope === 'prestige' || p.scope === 'elite';
    return `
    <div class="p-card${visible ? '' : ' hidden'}" data-key="${p.key}" data-cats="${p.cats.join(',')}">
      ${exclusive ? '<span class="p-exclusive">Exclusive</span>' : ''}
      <div class="p-swatch-strip">
        <div class="p-swatch" style="background:${p.palette.bg}"></div>
        <div class="p-swatch" style="background:${p.palette.accent}"></div>
        <div class="p-swatch" style="background:${p.palette.c2}"></div>
        <div class="p-swatch" style="background:${p.palette.c3}"></div>
        <div class="p-swatch" style="background:${p.palette.c4}"></div>
        <span class="p-style-badge">${p.style}</span>
      </div>
      <div class="p-mini" style="background:${p.palette.bg}">
        <span class="p-mini-num" style="color:${p.palette.accent}">${p.num}</span>
        <span class="p-mini-names" style="color:${p.palette.heading};font-family:'${p.font.heading}',Georgia,serif">A &amp; B</span>
        <div class="p-mini-rule" style="background:${p.palette.accent}"></div>
        <span class="p-mini-date" style="color:${p.palette.text}">June 14 · 2026</span>
      </div>
      <div class="p-body">
        <p class="p-name">${p.name}</p>
        <p class="p-vibe">${p.vibe}</p>
        <p class="p-meta-row"><span class="p-season">${p.season}</span><span class="p-font">${p.font.name}</span></p>
        <button class="p-btn" type="button" data-preview="${p.key}">Preview &amp; Select →</button>
      </div>
    </div>`;
  }).join('');

  updateCount(list);
}

function updateCount(list) {
  const all = list || presetsForTier(currentTier());
  const shown = all.filter(p => activeFilter === 'all' || p.cats.includes(activeFilter)).length;
  const bar = document.getElementById('count-bar');
  if (bar) bar.textContent = `Showing ${shown} of ${all.length} ${currentTier().name} presets`;
}

// ── FONTS — load a preset's real Google Fonts on demand ────────────
const loadedFonts = new Set();
function ensureFont(family) {
  if (!family || loadedFonts.has(family)) return;
  loadedFonts.add(family);
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=' +
    family.replace(/ /g, '+') + ':wght@400;500;600;700&display=swap';
  document.head.appendChild(link);
}
const ff = (family, fallback) => `'${family}', ${fallback}`;

// ── PREVIEW MODAL (styled mock-up) ─────────────────────────────────
function openPreview(key) {
  const p = PRESETS.find(x => x.key === key);
  const t = currentTier();
  if (!p) return;
  selectedPreset = p;

  ensureFont(p.font.heading);
  ensureFont(p.font.body);

  const modal = document.getElementById('preview-modal');
  const body  = document.getElementById('preview-body');
  const pal = p.palette;
  const headFont = ff(p.font.heading, 'Georgia, serif');
  const bodyFont = ff(p.font.body, 'system-ui, sans-serif');
  const isDark = p.cats.includes('dark');
  const heroOverlay = isDark ? 'rgba(0,0,0,0.30)' : 'rgba(255,255,255,0.10)';

  const sectionPills = t.sections
    .map(s => `<span class="mk-sec">${s}</span>`)
    .join('');

  const showCountdown = t.id !== 'essential';
  const isVideoHero = t.id === 'prestige';

  body.innerHTML = `
    <div class="mk-frame" style="background:${pal.bg};color:${pal.text};font-family:${bodyFont}">
      <div class="mk-bar">
        <span class="mk-dot" style="background:${pal.accent}"></span>
        <span class="mk-dot" style="background:${pal.c2}"></span>
        <span class="mk-dot" style="background:${pal.c4}"></span>
        <span class="mk-url" style="color:${pal.c4}">ava-and-liam.com</span>
      </div>

      <div class="mk-hero" style="background:linear-gradient(135deg, ${pal.c3}, ${pal.bg});">
        <div class="mk-hero-overlay" style="background:${heroOverlay}"></div>
        <div class="mk-hero-inner">
          ${isVideoHero ? `<span class="mk-badge" style="background:${pal.accent};color:${pal.bg}">▶ Video Hero</span>` : ''}
          <span class="mk-kicker" style="color:${pal.accent}">WE ARE GETTING MARRIED</span>
          <h3 class="mk-names" style="color:${pal.heading};font-family:${headFont}">Ava &amp; Liam</h3>
          <div class="mk-rule" style="background:${pal.accent}"></div>
          <p class="mk-date" style="color:${pal.text}">14 June 2026 · Tuscany, Italy</p>
          ${showCountdown ? `<div class="mk-countdown">${['128','06','42','19'].map((n,i) => `<span style="background:${pal.c3};color:${pal.heading}"><b>${n}</b>${['days','hrs','min','sec'][i]}</span>`).join('')}</div>` : ''}
          <button class="mk-cta" style="background:${pal.accent};color:${pal.bg}">RSVP</button>
        </div>
      </div>

      <div class="mk-section" style="border-top:1px solid ${pal.accent}22">
        <span class="mk-h" style="color:${pal.heading};font-family:${headFont}">Our Story</span>
        <div class="mk-lines">
          <span style="background:${pal.c4}55"></span>
          <span style="background:${pal.c4}40;width:88%"></span>
          <span style="background:${pal.c4}40;width:72%"></span>
        </div>
      </div>

      <div class="mk-section" style="border-top:1px solid ${pal.accent}22">
        <span class="mk-h" style="color:${pal.heading};font-family:${headFont}">Gallery</span>
        <div class="mk-gallery">
          ${[pal.c2, pal.c3, pal.accent, pal.c4, pal.c2, pal.c3].map(c => `<span style="background:${c}"></span>`).join('')}
        </div>
      </div>

      <div class="mk-footer" style="background:${pal.c3};color:${pal.text}">
        <span style="color:${pal.heading};font-family:${headFont}">A &amp; L</span> · with love
      </div>
    </div>

    <aside class="mk-side">
      <p class="mk-side-tier" style="color:var(--terra)">${t.name} · ${t.price}</p>
      <h3 class="mk-side-name">${p.name}</h3>
      <p class="mk-side-vibe">${p.vibe}</p>
      <dl class="mk-meta">
        <div><dt>Design style</dt><dd>${p.style}</dd></div>
        <div><dt>Font pairing</dt><dd>${p.font.name}</dd></div>
        <div><dt>Best season</dt><dd>${p.season}</dd></div>
        <div><dt>Preset №</dt><dd>${p.num}</dd></div>
        <div><dt>Revisions</dt><dd>${t.revisions} rounds</dd></div>
      </dl>
      <p class="mk-side-label">Typography</p>
      <div class="mk-type" style="border-color:${pal.accent}33">
        <span class="mk-type-h" style="font-family:${headFont}">${p.font.heading}</span>
        <span class="mk-type-b" style="font-family:${bodyFont}">${p.font.body} — the quick brown fox</span>
      </div>
      <p class="mk-side-label">Colour palette</p>
      <div class="mk-palette">
        ${['bg','heading','accent','c2','c4'].map(k => `<span style="background:${pal[k]}" title="${k}: ${pal[k]}"></span>`).join('')}
      </div>
      <p class="mk-side-label">Sections you will get</p>
      <div class="mk-sec-list">${sectionPills}</div>
      <button class="mk-proceed" type="button" id="proceed-btn">Proceed with this configuration →</button>
      <p class="mk-note">Next: a quick form, pre-filled with this tier &amp; preset.</p>
    </aside>`;

  const proceed = document.getElementById('proceed-btn');
  if (proceed) proceed.onclick = () => goToOnboarding(t, p);

  document.querySelectorAll('.p-card').forEach(c => c.classList.toggle('selected', c.dataset.key === key));

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closePreview() {
  const modal = document.getElementById('preview-modal');
  if (modal) modal.classList.remove('open');
  document.body.style.overflow = '';
}

function goToOnboarding(tier, preset) {
  const params = new URLSearchParams({
    tier: tier.id,
    tierName: tier.name,
    price: tier.price,
    preset: preset.key,
    presetName: preset.name,
    style: preset.style,
  });
  window.location.href = 'onboarding.html?' + params.toString();
}

// ── EVENTS ─────────────────────────────────────────────────────────
function selectTier(id) {
  if (activeTierId === id) return;
  activeTierId = id;
  activeFilter = 'all';
  selectedPreset = null;
  buildTiers();
  buildTierDetail();
  buildFilters();
  buildGrid();
  const gallery = document.getElementById('gallery-section');
  if (gallery) gallery.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

document.addEventListener('DOMContentLoaded', function () {
  buildTiers();
  buildTierDetail();
  buildFilters();
  buildGrid();

  const tierWrap = document.getElementById('tier-cards');
  if (tierWrap) tierWrap.addEventListener('click', e => {
    const btn = e.target.closest('.tier-card');
    if (btn) selectTier(btn.dataset.tier);
  });

  const filterWrap = document.getElementById('filter-wrap');
  if (filterWrap) filterWrap.addEventListener('click', e => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    activeFilter = btn.dataset.filter;
    buildFilters();
    buildGrid();
  });

  const grid = document.getElementById('presets-grid');
  if (grid) grid.addEventListener('click', e => {
    const btn = e.target.closest('[data-preview]');
    if (btn) openPreview(btn.dataset.preview);
  });

  const modal = document.getElementById('preview-modal');
  if (modal) modal.addEventListener('click', e => {
    if (e.target === modal || e.target.closest('[data-close]')) closePreview();
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closePreview(); });

  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
