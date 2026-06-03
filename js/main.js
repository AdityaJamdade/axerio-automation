// ══════════════════════════════════════════════════════════════════
//  AXERIO AUTOMATION — main.js
//  All runtime logic for index.html.
//  Depends on: three.min.js (global THREE) + config.js (window.SITE_CONFIG)
//  Both must load before this file.
// ══════════════════════════════════════════════════════════════════

// ══════════════════════════════════════════════════════════════════
//  THREE.JS  —  Neural-network particle background
// ══════════════════════════════════════════════════════════════════
(function () {
  const canvas = document.getElementById('bg-canvas');
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);

  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000);
  camera.position.z = 80;

  const N = 140;
  const positions = new Float32Array(N * 3);
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
  const mat = new THREE.PointsMaterial({ color: 0x90B8A0, size: 0.8, transparent: true, opacity: 0.35 });
  scene.add(new THREE.Points(geo, mat));

  const lGeo = new THREE.BufferGeometry();
  const lPos = new Float32Array(N * N * 6);
  lGeo.setAttribute('position', new THREE.BufferAttribute(lPos, 3));
  const lMat = new THREE.LineBasicMaterial({ color: 0xB8D4C0, transparent: true, opacity: 0.06 });
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
      if (Math.abs(pos[i*3])   > 90)  velocities[i*3]   *= -1;
      if (Math.abs(pos[i*3+1]) > 50)  velocities[i*3+1] *= -1;
      if (Math.abs(pos[i*3+2]) > 30)  velocities[i*3+2] *= -1;
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

// ══════════════════════════════════════════════════════════════════
//  POPULATE SITE FROM CONFIG
// ══════════════════════════════════════════════════════════════════
function populateSite() {
  const C = window.SITE_CONFIG;
  if (!C) return;

  // SEO
  document.title = C.seo.title;
  document.querySelector('meta[name="description"]').setAttribute('content', C.seo.description);
  document.querySelector('meta[property="og:title"]').setAttribute('content', C.seo.title);
  document.querySelector('meta[property="og:description"]').setAttribute('content', C.seo.description);
  document.querySelector('meta[property="og:url"]').setAttribute('content', C.seo.url);
  document.querySelector('meta[property="og:image"]').setAttribute('content', C.seo.image);
  document.querySelector('meta[property="og:image:alt"]').setAttribute('content', C.seo.title);
  const twitterCard = document.querySelector('meta[name="twitter:card"]');
  if (twitterCard) twitterCard.setAttribute('content', 'summary_large_image');
  const twitterTitle = document.querySelector('meta[name="twitter:title"]');
  if (twitterTitle) twitterTitle.setAttribute('content', C.seo.title);
  const twitterDesc = document.querySelector('meta[name="twitter:description"]');
  if (twitterDesc) twitterDesc.setAttribute('content', C.seo.description);
  const twitterImage = document.querySelector('meta[name="twitter:image"]');
  if (twitterImage) twitterImage.setAttribute('content', C.seo.image);

  // Logos
  document.getElementById('nav-logo-img').src  = C.company.logo;
  document.getElementById('footer-logo').src   = C.company.logo;

  // Hero
  document.getElementById('hero-badge').childNodes[1]
    ? document.getElementById('hero-badge').innerHTML = '<span style="width:7px;height:7px;border-radius:50%;background:var(--blue-bright);animation:pulse-dot 2s infinite;flex-shrink:0;display:inline-block"></span>' + C.hero.badge
    : null;
  document.getElementById('hero-line1').textContent    = C.hero.titleLine1;
  document.getElementById('hero-line2').textContent    = C.hero.titleLine2;
  document.getElementById('hero-subtitle').textContent = C.hero.subtitle;

  // Stats
  const sg = document.getElementById('stats-grid');
  sg.innerHTML = C.stats.map(s => `
    <div class="stat-item reveal">
      <span class="stat-value">${s.value}</span>
      <span class="stat-label">${s.label}</span>
    </div>`).join('');

  // Process steps
  const pg = document.getElementById('process-steps');
  pg.innerHTML = C.process.map((s, i) => `
    <div class="process-step reveal reveal-delay-${i+1}">
      <div class="step-number">${i+1}</div>
      <h3 class="step-title">${s.title}</h3>
      <p class="step-desc">${s.desc}</p>
    </div>`).join('');

  // Testimonials — show section only when array has entries
  if (C.testimonials && C.testimonials.length > 0) {
    document.getElementById('trust').style.display = '';
    const tg = document.getElementById('testimonials-grid');
    tg.innerHTML = C.testimonials.map(r => `
      <div class="review-card reveal">
        <div class="review-stars">★★★★★</div>
        <p class="review-quote">"${r.quote}"</p>
        <div class="review-author">
          <div class="review-avatar">${r.initial}</div>
          <div>
            <div class="review-name">${r.name}</div>
            <div class="review-role">${r.role}</div>
          </div>
        </div>
      </div>`).join('');
  }

  // Contact links
  const email = C.company.email;
  document.getElementById('contact-email-link').href       = 'mailto:' + email;
  document.getElementById('contact-email-text').textContent = email;
  document.getElementById('contact-instagram-link').href    = C.company.instagram;
  document.getElementById('contact-twitter-link').href      = C.company.twitter;
  document.getElementById('footer-email').href     = 'mailto:' + email;
  document.getElementById('footer-instagram').href = C.company.instagram;
  document.getElementById('footer-twitter').href   = C.company.twitter;
  document.getElementById('footer-linkedin').href  = C.company.linkedin;
  document.getElementById('footer-youtube').href   = C.company.youtube;
  document.getElementById('social-instagram').href = C.company.instagram;
  document.getElementById('social-twitter').href   = C.company.twitter;
  document.getElementById('social-linkedin').href  = C.company.linkedin;
  document.getElementById('social-youtube').href   = C.company.youtube;
  document.getElementById('social-email').href     = 'mailto:' + email;

  // Service select options
  const sel = document.getElementById('f-service');
  sel.innerHTML = C.form.services.map(s => `<option value="${s}">${s}</option>`).join('');

  // Footer year
  document.getElementById('footer-year').textContent = new Date().getFullYear();

  // Re-observe any dynamically inserted .reveal elements
  observeRevealElements();

  // Wire form
  wireForm(C);
}

// ══════════════════════════════════════════════════════════════════
//  FORMSPREE / MAILTO FORM
// ══════════════════════════════════════════════════════════════════
function wireForm(C) {
  const form   = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  if (!form) return;

  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    const btn = form.querySelector('.btn-submit');
    btn.disabled = true;
    btn.textContent = 'Sending…';
    status.className = '';
    status.textContent = '';

    const data = {
      name:    form.querySelector('#f-name').value.trim(),
      email:   form.querySelector('#f-email').value.trim(),
      service: form.querySelector('#f-service').value,
      message: form.querySelector('#f-message').value.trim(),
    };

    const fid = C.form && C.form.formspreeId;

    if (fid) {
      try {
        const res = await fetch('https://formspree.io/f/' + fid, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(data),
        });
        if (res.ok) {
          status.className = 'success';
          status.textContent = '✓ Message sent! We\'ll be in touch shortly.';
          form.reset();
        } else {
          throw new Error('Failed');
        }
      } catch {
        status.className = 'error';
        status.textContent = '✗ Something went wrong. Please email us directly.';
      }
    } else {
      // Fallback — open mailto
      const subject = encodeURIComponent('Enquiry: ' + data.service);
      const body    = encodeURIComponent(
        'Name: ' + data.name + '\nEmail: ' + data.email +
        '\nService: ' + data.service + '\n\n' + data.message
      );
      window.location.href = 'mailto:' + C.company.email + '?subject=' + subject + '&body=' + body;
    }

    btn.disabled = false;
    btn.textContent = 'Send Message ✦';
  });
}

// ══════════════════════════════════════════════════════════════════
//  INTERSECTION OBSERVER — scroll reveal
// ══════════════════════════════════════════════════════════════════
function observeRevealElements() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(el => {
      if (el.isIntersecting) {
        el.target.classList.add('visible');
        io.unobserve(el.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
}

// ══════════════════════════════════════════════════════════════════
//  3D CARD TILT (pointer devices only)
// ══════════════════════════════════════════════════════════════════
(function () {
  if (window.matchMedia('(hover: none)').matches) return;

  const card = document.getElementById('hero-card');
  if (!card) return;

  card.addEventListener('mousemove', function(e) {
    const r = card.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width  - 0.5) * 2;
    const y = ((e.clientY - r.top)  / r.height - 0.5) * 2;
    card.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${y * -6}deg) scale(1.02)`;
    card.style.boxShadow = `${x * -12}px ${y * -8}px 40px rgba(30,144,255,0.15)`;
  });
  card.addEventListener('mouseleave', function() {
    card.style.transform = '';
    card.style.boxShadow = '';
  });
})();

// ══════════════════════════════════════════════════════════════════
//  HAMBURGER MOBILE MENU
// ══════════════════════════════════════════════════════════════════
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
hamburger.addEventListener('click', function() {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});
function closeMobile() {
  hamburger.classList.remove('open');
  mobileMenu.classList.remove('open');
}

// ══════════════════════════════════════════════════════════════════
//  COOKIE CONSENT BANNER
// ══════════════════════════════════════════════════════════════════
(function() {
  const banner  = document.getElementById('cookie-banner');
  const consent = localStorage.getItem('axerio_cookie_consent');
  if (!consent) {
    setTimeout(function() { banner.style.display = 'flex'; }, 1200);
  }
})();

function cookieAccept() {
  localStorage.setItem('axerio_cookie_consent', 'accepted');
  document.getElementById('cookie-banner').style.display = 'none';
}
function cookieDecline() {
  localStorage.setItem('axerio_cookie_consent', 'declined');
  document.getElementById('cookie-banner').style.display = 'none';
}

// ══════════════════════════════════════════════════════════════════
//  INIT
// ══════════════════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', function() {
  populateSite();
  observeRevealElements();

  // Pre-fill contact form when arriving from the preset selector page
  // URL format: index.html?preset=Preset+Name#contact
  const presetParam = new URLSearchParams(window.location.search).get('preset');
  if (presetParam) {
    const serviceEl = document.getElementById('f-service');
    if (serviceEl) {
      for (let i = 0; i < serviceEl.options.length; i++) {
        if (serviceEl.options[i].value === 'Wedding Website (Phase 1)') {
          serviceEl.selectedIndex = i;
          break;
        }
      }
    }
    const msgEl = document.getElementById('f-message');
    if (msgEl && !msgEl.value) {
      msgEl.value = 'I love the "' + presetParam + '" preset! Please use this as the starting point for my wedding website.';
    }
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
  }
});
