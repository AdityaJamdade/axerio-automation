// =============================================================
//  AXERIO AUTOMATION — main.js
//  Depends on: three.min.js (global THREE) + config.js (SITE_CONFIG)
// =============================================================

// =============================================================
//  THREE.JS  —  Steel-blue neural network background
// =============================================================
(function () {
  const canvas   = document.getElementById('bg-canvas');
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);

  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000);
  camera.position.z = 80;

  const N = 140;
  const positions  = new Float32Array(N * 3);
  const velocities = [];
  for (let i = 0; i < N; i++) {
    positions[i*3]   = (Math.random()-0.5)*180;
    positions[i*3+1] = (Math.random()-0.5)*100;
    positions[i*3+2] = (Math.random()-0.5)*60;
    velocities.push(
      (Math.random()-0.5)*0.04,
      (Math.random()-0.5)*0.04,
      (Math.random()-0.5)*0.02
    );
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  // Steel blue particles matching logo
  const mat = new THREE.PointsMaterial({ color: 0x8AAFC8, size: 0.8, transparent: true, opacity: 0.35 });
  scene.add(new THREE.Points(geo, mat));

  const lGeo = new THREE.BufferGeometry();
  const lPos = new Float32Array(N * N * 6);
  lGeo.setAttribute('position', new THREE.BufferAttribute(lPos, 3));
  // Light steel connections
  const lMat = new THREE.LineBasicMaterial({ color: 0xC8D8E4, transparent: true, opacity: 0.07 });
  const lines = new THREE.LineSegments(lGeo, lMat);
  scene.add(lines);

  let mouse = { x: 0, y: 0 };
  window.addEventListener('mousemove', e => {
    mouse.x = (e.clientX / window.innerWidth  - 0.5) * 40;
    mouse.y = (e.clientY / window.innerHeight - 0.5) * -20;
  });

  function resize() {
    const w = window.innerWidth, h = window.innerHeight;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener('resize', resize);

  let lIdx = 0;
  function animate() {
    requestAnimationFrame(animate);
    const pos = geo.attributes.position.array;
    for (let i = 0; i < N; i++) {
      pos[i*3]   += velocities[i*3];
      pos[i*3+1] += velocities[i*3+1];
      pos[i*3+2] += velocities[i*3+2];
      if (Math.abs(pos[i*3])   > 90) velocities[i*3]   *= -1;
      if (Math.abs(pos[i*3+1]) > 50) velocities[i*3+1] *= -1;
      if (Math.abs(pos[i*3+2]) > 30) velocities[i*3+2] *= -1;
    }
    geo.attributes.position.needsUpdate = true;

    lIdx = 0;
    const lp = lGeo.attributes.position.array;
    for (let i = 0; i < N; i++) {
      for (let j = i+1; j < N; j++) {
        const dx = pos[i*3]-pos[j*3], dy = pos[i*3+1]-pos[j*3+1], dz = pos[i*3+2]-pos[j*3+2];
        if (dx*dx + dy*dy + dz*dz < 900) {
          lp[lIdx++]=pos[i*3]; lp[lIdx++]=pos[i*3+1]; lp[lIdx++]=pos[i*3+2];
          lp[lIdx++]=pos[j*3]; lp[lIdx++]=pos[j*3+1]; lp[lIdx++]=pos[j*3+2];
        }
      }
    }
    lGeo.setDrawRange(0, lIdx/3);
    lGeo.attributes.position.needsUpdate = true;

    camera.position.x += (mouse.x - camera.position.x) * 0.04;
    camera.position.y += (mouse.y - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);
  }
  animate();
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
    card.style.boxShadow  = (x*-12) + 'px ' + (y*-8) + 'px 40px rgba(30,144,255,0.15)';
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

  // Ambient blue orbs — logo palette colours
  const orbs = [
    { cls: 'orb-drift-1', s: 'width:500px;height:500px;background:radial-gradient(circle,rgba(30,144,255,0.12) 0%,transparent 70%);top:-120px;left:-180px;' },
    { cls: 'orb-drift-2', s: 'width:400px;height:400px;background:radial-gradient(circle,rgba(59,191,255,0.09) 0%,transparent 70%);top:30%;right:-120px;' },
    { cls: 'orb-drift-3', s: 'width:380px;height:380px;background:radial-gradient(circle,rgba(21,101,192,0.08) 0%,transparent 70%);bottom:-60px;left:35%;' }
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
