// ══════════════════════════════════════════════════════════════════
//  AXERIO AUTOMATION — presets.js
//  All runtime logic for presets.html.
//  No external dependencies required.
// ══════════════════════════════════════════════════════════════════

// ── PRESET DATA ────────────────────────────────────────────────────
//  cats: used by the filter bar. Values: light | dark | botanical |
//        minimal | glassmorphism | bold | claymorphism
// ──────────────────────────────────────────────────────────────────
const PRESETS = [
  { num:'01', name:'Romantic Bloom',  style:'Glassmorphism', vibe:'Classic · Dreamy · Timeless',              season:'Spring / Summer', bg:'#FDFAF6', accent:'#C9A45A', c2:'#A0617A', c3:'#F5ECD7', c4:'#7A6A5A', c5:'#1A1210', textCol:'#3A2E28', cats:['light','glassmorphism'] },
  { num:'02', name:'Blush Cloud',     style:'Claymorphism',  vibe:'Playful · Soft · Modern',                  season:'Spring / Summer', bg:'#FDF7F8', accent:'#D4828F', c2:'#E8B4BC', c3:'#FAF0F2', c4:'#8A6A70', c5:'#2A1820', textCol:'#3A2830', cats:['light','claymorphism'] },
  { num:'03', name:'Lavender Dreams', style:'Neumorphism',   vibe:'Delicate · Ethereal · Intimate',           season:'All seasons',     bg:'#FAF8FE', accent:'#8B7BAB', c2:'#C4B4D8', c3:'#F2EEFF', c4:'#7A6A8A', c5:'#1E1828', textCol:'#2E2838', cats:['light'] },
  { num:'04', name:'Champagne Toast', style:'Neumorphism',   vibe:'Warm · Traditional · Upscale',             season:'Fall / Winter',   bg:'#FBF7EE', accent:'#B8965A', c2:'#D4B896', c3:'#F5EDDA', c4:'#7A6A50', c5:'#1E1A10', textCol:'#3A3020', cats:['light'] },
  { num:'05', name:'Crystal Clear',   style:'Liquid Glass',  vibe:'Ethereal · Futuristic · Timeless',         season:'All seasons',     bg:'#FEFEFE', accent:'#1A1A1A', c2:'#C9A45A', c3:'#F5F0E8', c4:'#888888', c5:'#000000', textCol:'#2A2A2A', cats:['light','minimal'] },
  { num:'06', name:'Dark Elegance',   style:'Dark Academia', vibe:'Moody · Sophisticated · Luxurious',        season:'Fall / Winter',   bg:'#0D1526', accent:'#C9A45A', c2:'#1A2744', c3:'#6B8FBF', c4:'#8A9AB5', c5:'#162240', textCol:'#F0E6D3', cats:['dark'] },
  { num:'07', name:'Midnight Gold',   style:'Glassmorphism', vibe:'Dramatic · Modern · Luxurious',            season:'Fall / Winter',   bg:'#0D1526', accent:'#C9A45A', c2:'#6B8FBF', c3:'#111E38', c4:'#D4CBBA', c5:'#162240', textCol:'#F0E6D3', cats:['dark','glassmorphism'] },
  { num:'08', name:'Bold Romance',    style:'Neo Brutalism', vibe:'Artistic · Confident · Unforgettable',     season:'All seasons',     bg:'#FBF6F4', accent:'#BC7E82', c2:'#D4A096', c3:'#F8EFED', c4:'#826060', c5:'#221616', textCol:'#3A2828', cats:['light','bold'] },
  { num:'09', name:'Rose & Stone',    style:'Dark Academia', vibe:'Intellectual · Moody · Editorial',         season:'Fall',            bg:'#0F0D0C', accent:'#6B7B8D', c2:'#A8B4C0', c3:'#1E1C1A', c4:'#8A8278', c5:'#1A2028', textCol:'#E8E0D4', cats:['dark'] },
  { num:'10', name:'Bold Midnight',   style:'Neo Brutalism', vibe:'Avant-garde · Polarizing · Memorable',    season:'All seasons',     bg:'#0D1526', accent:'#C9A45A', c2:'#1A2744', c3:'#111E38', c4:'#D4CBBA', c5:'#F0E6D3', textCol:'#F0E6D3', cats:['dark','bold'] },
  { num:'11', name:'Garden Party',    style:'Botanical',     vibe:'Natural · Fresh · Organic',                season:'Spring / Summer', bg:'#F5FAF5', accent:'#7A9E7E', c2:'#A8C5A0', c3:'#ECF4ED', c4:'#6A7A6C', c5:'#1A2A1C', textCol:'#2A3A2C', cats:['light','botanical'] },
  { num:'12', name:'Emerald Forest',  style:'Botanical',     vibe:'Lush · Rich · Editorial',                  season:'All seasons',     bg:'#F5FBF7', accent:'#2D6A4F', c2:'#C9A45A', c3:'#EAF5EE', c4:'#5A7A68', c5:'#0D1E18', textCol:'#1A2E24', cats:['light','botanical'] },
  { num:'13', name:'Sage Minimal',    style:'Minimalism',    vibe:'Serene · Zen · Understated',               season:'All seasons',     bg:'#F5FAF5', accent:'#7A9E7E', c2:'#1A2A1C', c3:'#ECF4ED', c4:'#6A7A6C', c5:'#FEFEFE', textCol:'#2A3A2C', cats:['light','botanical','minimal'] },
  { num:'14', name:'Tropical Modern', style:'Liquid Glass',  vibe:'Fresh · Tropical · Contemporary',          season:'Summer',          bg:'#F5FBF7', accent:'#2D6A4F', c2:'#C9A45A', c3:'#EAF5EE', c4:'#0D1E18', c5:'#FEFEFE', textCol:'#1A2E24', cats:['light','botanical'] },
  { num:'15', name:'Sage & Clay',     style:'Claymorphism',  vibe:'Earthy · Playful · Grounded',              season:'Fall / Spring',   bg:'#F5FAF5', accent:'#7A9E7E', c2:'#A8C5A0', c3:'#EDF3EE', c4:'#2A3A2C', c5:'#FEFEFE', textCol:'#2A3A2C', cats:['light','botanical','claymorphism'] },
  { num:'16', name:'Blush Minimal',   style:'Minimalism',    vibe:'Ultra-clean · Instagram-worthy · Modern',  season:'All seasons',     bg:'#FDF7F8', accent:'#D4828F', c2:'#E8B4BC', c3:'#FAF0F2', c4:'#8A6A70', c5:'#2A1820', textCol:'#3A2830', cats:['light','minimal'] },
  { num:'17', name:'Dusty Romance',   style:'Claymorphism',  vibe:'Whimsical · Feminine · Story-book',        season:'Spring / Fall',   bg:'#FBF6F4', accent:'#BC7E82', c2:'#D4A096', c3:'#F3ECEA', c4:'#826060', c5:'#221616', textCol:'#3A2828', cats:['light','claymorphism'] },
  { num:'18', name:'Ivory Poet',      style:'Dark Academia', vibe:'Literary · Candlelit · Deeply Romantic',   season:'Fall / Winter',   bg:'#0F0D0C', accent:'#B8965A', c2:'#D4B896', c3:'#1E1C1A', c4:'#8A8278', c5:'#F5F0E8', textCol:'#E8E0D4', cats:['dark'] },
  { num:'19', name:'Gold Rush',       style:'Glassmorphism', vibe:'Opulent · Festive · High-end',             season:'Fall / Winter',   bg:'#FDFAF6', accent:'#C9A45A', c2:'#A0617A', c3:'#F5ECD7', c4:'#7A6A5A', c5:'#1A1210', textCol:'#3A2E28', cats:['light','glassmorphism'] },
  { num:'20', name:'Modern Luxe',     style:'Minimalism',    vibe:'Sophisticated · Clean · Grown-up',         season:'All seasons',     bg:'#FBF7EE', accent:'#B8965A', c2:'#D4B896', c3:'#F2EBDA', c4:'#1E1A10', c5:'#7A6A50', textCol:'#3A3020', cats:['light','minimal'] },
];

// ── RENDER GRID ────────────────────────────────────────────────────
function buildGrid(filter) {
  const grid = document.getElementById('presets-grid');
  if (!grid) return;

  grid.innerHTML = PRESETS.map((p, i) => {
    const visible = filter === 'all' || p.cats.includes(filter);
    return `
    <div class="p-card${visible ? '' : ' hidden'}" id="pc-${i}" data-cats="${p.cats.join(',')}">
      <div class="p-swatch-strip">
        <div class="p-swatch" style="background:${p.bg}"></div>
        <div class="p-swatch" style="background:${p.accent}"></div>
        <div class="p-swatch" style="background:${p.c2}"></div>
        <div class="p-swatch" style="background:${p.c3}"></div>
        <div class="p-swatch" style="background:${p.c4}"></div>
        <span class="p-style-badge">${p.style}</span>
      </div>
      <div class="p-mini-preview" style="background:${p.bg}">
        <span style="font-size:10px;color:${p.accent};opacity:0.5;font-family:'Space Grotesk',sans-serif;font-weight:500">${p.num}</span>
        <span style="font-size:18px;color:${p.accent};font-family:'Space Grotesk',sans-serif;font-weight:600">A &amp; B</span>
        <div style="width:32px;height:1px;background:${p.accent};opacity:0.7;margin:2px 0"></div>
        <span style="font-size:11px;color:${p.textCol};opacity:0.5;font-family:'Inter',sans-serif">June 14 · 2026</span>
      </div>
      <div class="p-body">
        <p class="p-name">${p.name}</p>
        <p class="p-vibe">${p.vibe}</p>
        <p class="p-season">🗓 ${p.season}</p>
        <button class="p-btn" onclick="choosePreset('${p.name.replace(/'/g, "\\'")}', ${i})">Choose This →</button>
      </div>
    </div>`;
  }).join('');

  updateCount();
}

// ── CHOOSE PRESET ──────────────────────────────────────────────────
function choosePreset(name, idx) {
  document.querySelectorAll('.p-card').forEach(c => c.classList.remove('selected'));
  const card = document.getElementById('pc-' + idx);
  if (card) card.classList.add('selected');
  // Navigate to contact form with preset name as URL param
  window.location.href = 'index.html?preset=' + encodeURIComponent(name) + '#contact';
}

// ── FILTER BAR ─────────────────────────────────────────────────────
function updateCount() {
  const shown = document.querySelectorAll('.p-card:not(.hidden)').length;
  const bar = document.getElementById('count-bar');
  if (bar) bar.textContent = 'Showing ' + shown + ' of ' + PRESETS.length + ' presets';
}

document.addEventListener('DOMContentLoaded', function() {
  buildGrid('all');

  const filterWrap = document.getElementById('filter-wrap');
  if (filterWrap) {
    filterWrap.addEventListener('click', function(e) {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      document.querySelectorAll('.p-card').forEach(c => {
        const cats = c.dataset.cats.split(',');
        c.classList.toggle('hidden', filter !== 'all' && !cats.includes(filter));
      });
      updateCount();
    });
  }

  // Footer year
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
