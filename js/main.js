// =============================================================
//  AXERIO AUTOMATION — main.js
//  Depends on: config.js (SITE_CONFIG). Hero background is a lightweight
//  Canvas2D aurora + neural flow-field animation — no external libraries.
// =============================================================

// =============================================================
//  HERO BACKGROUND  —  Neural flow-field, enriched (Canvas2D)
//  Particles stream along a noise flow field across parallax
//  depth layers, with glowing stream-heads, occasional bright
//  data-pulses, a soft aurora base and faint twinkling stars —
//  "intelligence in motion". No libraries. Scoped to #hero;
//  pauses off-screen / tab hidden. Animates regardless of
//  reduced-motion; flip the flag to honour it.
// =============================================================
(function () {
  const PAUSE_ON_REDUCED_MOTION = false;

  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) return;

  function sprite(size, stops) {
    const s = document.createElement('canvas');
    s.width = s.height = size;
    const c = s.getContext('2d');
    const g = c.createRadialGradient(size/2, size/2, 0, size/2, size/2, size/2);
    stops.forEach(st => g.addColorStop(st[0], st[1]));
    c.fillStyle = g; c.fillRect(0, 0, size, size);
    return s;
  }
  // soft aurora blobs — gentle, for depth + text legibility
  const auroraA = sprite(512, [[0,'rgba(70,80,255,0.40)'],[0.45,'rgba(55,55,200,0.16)'],[1,'rgba(40,40,150,0)']]);
  const auroraB = sprite(512, [[0,'rgba(120,70,230,0.30)'],[0.45,'rgba(90,55,190,0.12)'],[1,'rgba(60,40,150,0)']]);
  const auroraC = sprite(512, [[0,'rgba(50,120,255,0.28)'],[0.50,'rgba(40,80,210,0.11)'],[1,'rgba(30,60,170,0)']]);
  const auroraD = sprite(512, [[0,'rgba(95,90,235,0.26)'],[0.50,'rgba(70,65,200,0.10)'],[1,'rgba(50,50,160,0)']]);
  // glowing stream-heads + bright pulse heads + tiny stars
  const head    = sprite(48, [[0,'rgba(220,240,255,0.95)'],[0.35,'rgba(120,200,255,0.5)'],[1,'rgba(80,160,255,0)']]);
  const headHot = sprite(60, [[0,'rgba(255,255,255,0.98)'],[0.30,'rgba(185,225,255,0.6)'],[1,'rgba(120,190,255,0)']]);
  const starS   = sprite(16, [[0,'rgba(255,255,255,0.9)'],[0.5,'rgba(175,210,255,0.4)'],[1,'rgba(175,210,255,0)']]);

  let W=0, H=0, DPR=1, R=0;
  let blobs = [], parts = [], stars = [];
  const K = 10;                                  // trail length per particle

  function initScene() {
    blobs = [
      { sp:auroraA, bx:0.28, by:0.40, ax:0.16, ay:0.12, sz:1.5, s1:0.08, s2:0.11, ph:0   },
      { sp:auroraB, bx:0.64, by:0.32, ax:0.14, ay:0.16, sz:1.3, s1:0.10, s2:0.07, ph:1.7 },
      { sp:auroraC, bx:0.50, by:0.66, ax:0.18, ay:0.11, sz:1.6, s1:0.06, s2:0.12, ph:3.1 },
      { sp:auroraD, bx:0.80, by:0.60, ax:0.13, ay:0.14, sz:1.2, s1:0.12, s2:0.09, ph:4.6 },
      { sp:auroraB, bx:0.40, by:0.80, ax:0.12, ay:0.10, sz:1.0, s1:0.09, s2:0.13, ph:2.3 }
    ];
    const n = Math.round(Math.min(250, (W*H)/5500));
    parts = [];
    for (let i=0;i<n;i++) parts.push({
      x:Math.random()*W, y:Math.random()*H, hist:[],
      life:40+Math.random()*200, depth:Math.random(),
      hue:(Math.random()*3)|0
    });
    parts.sort((a,b) => a.depth - b.depth);        // far → near (parallax)
    const sn = Math.round(Math.min(48, (W*H)/26000));
    stars = [];
    for (let i=0;i<sn;i++) stars.push({
      x:Math.random()*W, y:Math.random()*H, r:0.6+Math.random()*1.4,
      tw:Math.random()*6.28, ts:0.5+Math.random()*1.0
    });
  }
  function resize() {
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    W = canvas.clientWidth; H = canvas.clientHeight;
    if (!W || !H) return;
    canvas.width = (W*DPR)|0; canvas.height = (H*DPR)|0;
    ctx.setTransform(DPR,0,0,DPR,0,0);
    R = Math.min(W, H);
    initScene();
  }
  resize();
  window.addEventListener('resize', resize, { passive:true });

  // scroll energy — the streams surge while the page is scrolling
  let scrollV = 0, lastSY = (typeof window.scrollY === 'number' ? window.scrollY : 0);
  window.addEventListener('scroll', function () {
    const y = window.scrollY || 0;
    scrollV = Math.min(1.6, scrollV + Math.abs(y - lastSY) * 0.012);
    lastSY = y;
  }, { passive:true });

  // smooth pseudo-noise flow direction (no library)
  function field(x, y, t) {
    return (Math.sin(x*0.0026 + t*0.15) + Math.cos(y*0.0031 - t*0.12) + Math.sin((x+y)*0.0017 + t*0.10)) * Math.PI;
  }

  let t = 0, last = performance.now(), running = false;

  function step(now) {
    if (!running) return;
    let dt = (now - last)/1000; last = now;
    if (dt > 0.05) dt = 0.05;
    t += dt;
    scrollV *= 0.90;                               // decay scroll surge

    ctx.clearRect(0, 0, W, H);
    ctx.globalCompositeOperation = 'lighter';

    // 1 · aurora gradient base
    ctx.globalAlpha = 0.9;
    for (const b of blobs) {
      const x = (b.bx + Math.sin(t*b.s1 + b.ph)*b.ax) * W;
      const y = (b.by + Math.cos(t*b.s2 + b.ph)*b.ay) * H;
      const s = R * b.sz;
      ctx.drawImage(b.sp, x - s/2, y - s/2, s, s);
    }

    ctx.globalAlpha = 1;

    // 2 · neural flow-field streams (subtle parallax depth, no heads)
    ctx.lineCap = 'round';
    const base = 41;
    for (const q of parts) {
      const sp = base * (0.6 + q.depth*0.8) * (1 + scrollV*1.3);
      const a = field(q.x, q.y, t);
      q.hist.push(q.x, q.y);
      if (q.hist.length > K*2) { q.hist.shift(); q.hist.shift(); }
      q.x += Math.cos(a)*sp*dt*2.2;
      q.y += Math.sin(a)*sp*dt*2.2;
      q.life -= dt*60;
      if (q.life < 0 || q.x < -20 || q.x > W+20 || q.y < -20 || q.y > H+20) {
        q.x = Math.random()*W; q.y = Math.random()*H; q.hist.length = 0;
        q.life = 80 + Math.random()*180; continue;
      }
      if (q.hist.length >= 4) {
        const al = Math.min(0.55, (0.09 + q.depth*0.17) * (1 + scrollV*0.5));
        ctx.strokeStyle = (q.hue === 0 ? 'rgba(150,150,235,' + al.toFixed(3) + ')'
                        :  q.hue === 1 ? 'rgba(90,110,255,'  + al.toFixed(3) + ')'
                        :                'rgba(140,170,255,' + al.toFixed(3) + ')');
        ctx.lineWidth = 0.6 + q.depth*1.1;
        ctx.beginPath();
        ctx.moveTo(q.hist[0], q.hist[1]);
        for (let i=2;i<q.hist.length;i+=2) ctx.lineTo(q.hist[i], q.hist[i+1]);
        ctx.lineTo(q.x, q.y);
        ctx.stroke();
      }
    }

    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 1;
    requestAnimationFrame(step);
  }

  function start() { if (running) return; running = true; last = performance.now(); requestAnimationFrame(step); }
  function stop()  { running = false; }

  if (PAUSE_ON_REDUCED_MOTION && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    requestAnimationFrame(function (n) { last = n; running = true; step(n); running = false; });
    return;
  }

  document.addEventListener('visibilitychange', function () {
    if (document.hidden) stop(); else start();
  });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) start(); else stop(); });
    }, { threshold: 0 }).observe(canvas);
  } else {
    start();
  }
})();

// =============================================================
//  POPULATE SITE FROM CONFIG
// =============================================================
function populateSite() {
  const C = window.SITE_CONFIG;
  if (!C) return;

  document.title = C.seo.title;
  document.querySelector('meta[name="description"]').setAttribute('content', C.seo.description);
  document.querySelector('meta[property="og:title"]').setAttribute('content', C.seo.title);
  document.querySelector('meta[property="og:description"]').setAttribute('content', C.seo.description);
  document.querySelector('meta[property="og:url"]').setAttribute('content', C.seo.url);
  document.querySelector('meta[property="og:image"]').setAttribute('content', C.seo.image);
  document.querySelector('meta[property="og:image:alt"]').setAttribute('content', C.seo.title);
  ['twitter:card','twitter:title','twitter:description','twitter:image'].forEach((n,i) => {
    const el = document.querySelector('meta[name="' + n + '"]');
    if (el) el.setAttribute('content', ['summary_large_image', C.seo.title, C.seo.description, C.seo.image][i]);
  });

  document.getElementById('nav-logo-img').src = C.company.logo;
  document.getElementById('footer-logo').src  = C.company.logo;

  document.getElementById('hero-line1').textContent    = C.hero.titleLine1;
  document.getElementById('hero-line2').textContent    = C.hero.titleLine2;
  document.getElementById('hero-subtitle').textContent = C.hero.subtitle;

  const sg = document.getElementById('stats-grid');
  sg.innerHTML = C.stats.map(s =>
    '<div class="stat-item reveal"><span class="stat-value">' + s.value + '</span><span class="stat-label">' + s.label + '</span></div>'
  ).join('');

  const pg = document.getElementById('process-steps');
  pg.innerHTML = C.process.map((s, i) =>
    '<div class="process-step reveal reveal-delay-' + (i+1) + '"><div class="step-number">' + (i+1) +
    '</div><h3 class="step-title">' + s.title + '</h3><p class="step-desc">' + s.desc + '</p></div>'
  ).join('');

  if (C.testimonials && C.testimonials.length > 0) {
    document.getElementById('trust').style.display = '';
    const tg = document.getElementById('testimonials-grid');
    tg.innerHTML = C.testimonials.map(r =>
      '<div class="review-card reveal"><div class="review-stars">\u2605\u2605\u2605\u2605\u2605</div>' +
      '<p class="review-quote">&ldquo;' + r.quote + '&rdquo;</p>' +
      '<div class="review-author"><div class="review-avatar">' + r.initial + '</div>' +
      '<div><div class="review-name">' + r.name + '</div><div class="review-role">' + r.role + '</div></div></div></div>'
    ).join('');
  }

  const email = C.company.email;
  document.getElementById('contact-email-link').href        = 'mailto:' + email;
  document.getElementById('contact-email-text').textContent  = email;
  document.getElementById('contact-instagram-link').href     = C.company.instagram;
  document.getElementById('contact-twitter-link').href       = C.company.twitter;
  document.getElementById('footer-email').href      = 'mailto:' + email;
  document.getElementById('footer-instagram').href  = C.company.instagram;
  document.getElementById('footer-twitter').href    = C.company.twitter;
  document.getElementById('footer-linkedin').href   = C.company.linkedin;
  document.getElementById('footer-youtube').href    = C.company.youtube;
  document.getElementById('social-instagram').href  = C.company.instagram;
  document.getElementById('social-twitter').href    = C.company.twitter;
  document.getElementById('social-linkedin').href   = C.company.linkedin;
  document.getElementById('social-youtube').href    = C.company.youtube;
  document.getElementById('social-email').href      = 'mailto:' + email;

  const sel = document.getElementById('f-service');
  sel.innerHTML = C.form.services.map(s => '<option value="' + s + '">' + s + '</option>').join('');

  document.getElementById('footer-year').textContent = new Date().getFullYear();

  observeRevealElements();
  wireForm(C);
}

// =============================================================
//  FORM
// =============================================================
function wireForm(C) {
  const form   = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  if (!form) return;
  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    const btn = form.querySelector('.btn-submit');
    btn.disabled = true; btn.textContent = 'Sending...';
    status.className = ''; status.textContent = '';
    const service = form.querySelector('#f-service').value;
    const payload = {
      name:    form.querySelector('#f-name').value.trim(),
      email:   form.querySelector('#f-email').value.trim(),
      subject: 'Enquiry: ' + service,
      message: form.querySelector('#f-message').value.trim(),
    };
    const base = C.api && C.api.baseUrl;
    if (base) {
      try {
        const res = await fetch(base.replace(/\/$/, '') + '/api/wedding/contact', {
          method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (res.ok) { status.className = 'success'; status.textContent = 'Message sent! We will be in touch shortly.'; form.reset(); }
        else throw new Error();
      } catch { status.className = 'error'; status.textContent = 'Something went wrong. Please email us directly.'; }
    } else {
      const s = encodeURIComponent('Enquiry: ' + service);
      const b = encodeURIComponent('Name: ' + payload.name + '\nEmail: ' + payload.email + '\nService: ' + service + '\n\n' + payload.message);
      window.location.href = 'mailto:' + C.company.email + '?subject=' + s + '&body=' + b;
    }
    btn.disabled = false; btn.textContent = 'Send Message \u2736';
  });
}

// =============================================================
//  SCROLL REVEAL
// =============================================================
function observeRevealElements() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(el => { if (el.isIntersecting) { el.target.classList.add('visible'); io.unobserve(el.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
}

// =============================================================
//  3D CARD TILT
// =============================================================
(function () {
  if (window.matchMedia('(hover: none)').matches) return;
  const card = document.getElementById('hero-card');
  if (!card) return;
  card.addEventListener('mousemove', function(e) {
    const r = card.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width  - 0.5) * 2;
    const y = ((e.clientY - r.top)  / r.height - 0.5) * 2;
    card.style.transform  = 'perspective(800px) rotateY(' + (x*8) + 'deg) rotateX(' + (y*-6) + 'deg) scale(1.02)';
    card.style.boxShadow  = (x*-12) + 'px ' + (y*-8) + 'px 40px rgba(110,140,255,0.15)';
  });
  card.addEventListener('mouseleave', function() { card.style.transform = ''; card.style.boxShadow = ''; });
})();

// =============================================================
//  HAMBURGER
// =============================================================
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
hamburger.addEventListener('click', function() {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});
function closeMobile() {
  hamburger.classList.remove('open');
  mobileMenu.classList.remove('open');
}

// =============================================================
//  COOKIE CONSENT
// =============================================================
(function() {
  const banner  = document.getElementById('cookie-banner');
  const consent = localStorage.getItem('axerio_cookie_consent');
  if (!consent) setTimeout(function() { banner.style.display = 'flex'; }, 1200);
})();
function cookieAccept()  { localStorage.setItem('axerio_cookie_consent','accepted');  document.getElementById('cookie-banner').style.display='none'; }
function cookieDecline() { localStorage.setItem('axerio_cookie_consent','declined'); document.getElementById('cookie-banner').style.display='none'; }

// =============================================================
//  ANIMATION HELPERS
// =============================================================

// 1. Inject laser scan line + ambient blue orbs into hero
function initHeroEffects() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const hero = document.getElementById('hero');
  if (!hero) return;

  // Laser scan line (CSS in animations.css drives it)
  const laser = document.createElement('div');
  laser.className = 'hero-laser';
  laser.addEventListener('animationend', function() { laser.remove(); });
  hero.appendChild(laser);

  // Ambient orbs — blue palette colours
  const orbs = [
    { cls: 'orb-drift-1', s: 'width:500px;height:500px;background:radial-gradient(circle,rgba(110,140,255,0.12) 0%,transparent 70%);top:-120px;left:-180px;' },
    { cls: 'orb-drift-2', s: 'width:400px;height:400px;background:radial-gradient(circle,rgba(138,176,255,0.09) 0%,transparent 70%);top:30%;right:-120px;' },
    { cls: 'orb-drift-3', s: 'width:380px;height:380px;background:radial-gradient(circle,rgba(59,47,176,0.08) 0%,transparent 70%);bottom:-60px;left:35%;' }
  ];
  orbs.forEach(function(d) {
    const el = document.createElement('div');
    el.className = d.cls;
    el.style.cssText = 'position:absolute;border-radius:50%;filter:blur(65px);pointer-events:none;z-index:0;will-change:transform;' + d.s;
    hero.insertBefore(el, hero.firstChild);
  });

  // Hero inner must sit above orbs
  const inner = hero.querySelector('.hero-inner');
  if (inner) { inner.style.position = 'relative'; inner.style.zIndex = '1'; }
}

// 2. Stats count-up when scrolled into view
function initStatsCountUp() {
  const statsEl = document.getElementById('stats');
  if (!statsEl) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

  function animateValue(el, num, pre, suf) {
    if (reduced) { el.textContent = pre + num + suf; return; }
    const dur = 1500, t0 = performance.now(), isInt = (num === Math.floor(num));
    (function tick(now) {
      const t = Math.min((now - t0) / dur, 1), v = num * easeOut(t);
      el.textContent = pre + (isInt ? Math.round(v) : v.toFixed(1)) + suf;
      if (t < 1) requestAnimationFrame(tick);
    })(t0);
  }

  function run(el, delay) {
    const raw = el.textContent.trim();
    const m   = raw.match(/^([^\d]*)(\d+(?:\.\d+)?)([^\d]*)$/);
    if (!m) {
      if (!reduced) setTimeout(function() {
        el.style.animation = 'statPop 0.55s cubic-bezier(0.34,1.56,0.64,1) forwards';
      }, delay);
      return;
    }
    el.textContent = m[1] + '0' + m[3];
    setTimeout(function() { animateValue(el, parseFloat(m[2]), m[1], m[3]); }, delay);
  }

  new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (!e.isIntersecting) return;
      e.target.querySelectorAll('.stat-value').forEach(function(el, i) { run(el, i * 160); });
    });
  }, { threshold: 0.3 }).observe(statsEl);
}

// 3. Nav depth shadow on scroll
function initNavScroll() {
  const nav = document.querySelector('nav');
  if (!nav) return;
  window.addEventListener('scroll', function() {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
}

// =============================================================
//  INIT
// =============================================================
document.addEventListener('DOMContentLoaded', function() {
  populateSite();
  observeRevealElements();

  initHeroEffects();
  initStatsCountUp();
  initNavScroll();

  // Pre-fill form from preset selector page
  const presetParam = new URLSearchParams(window.location.search).get('preset');
  if (presetParam) {
    const serviceEl = document.getElementById('f-service');
    if (serviceEl) {
      for (let i = 0; i < serviceEl.options.length; i++) {
        if (serviceEl.options[i].value === 'Wedding Website (Phase 1)') { serviceEl.selectedIndex = i; break; }
      }
    }
    const msgEl = document.getElementById('f-message');
    if (msgEl && !msgEl.value) {
      msgEl.value = 'I love the "' + presetParam + '" preset! Please use this as the starting point for my wedding website.';
    }
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
  }
});