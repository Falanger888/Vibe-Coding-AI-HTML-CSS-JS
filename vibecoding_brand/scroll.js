(function () {
  'use strict';

  /* ===== 1. SCROLL PROGRESS ===== */
  const bar = document.createElement('div');
  bar.className = 'scroll-progress';
  bar.innerHTML = '<div class="scroll-progress__bar"></div>';
  document.body.appendChild(bar);
  const fill = bar.firstChild;

  function updateProgress() {
    const doc = document.documentElement;
    const max = doc.scrollHeight - doc.clientHeight;
    fill.style.width = (max > 0 ? (doc.scrollTop / max) * 100 : 0) + '%';
  }
  document.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress);
  updateProgress();

  /* ===== 2. REVEAL ===== */
  const revealEls = document.querySelectorAll('.reveal, .reveal-stagger');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ===== 3. COUNTERS ===== */
  const counters = document.querySelectorAll('.counter');
  if ('IntersectionObserver' in window && counters.length) {
    const easeOut = t => 1 - Math.pow(1 - t, 3);

    function run(el) {
      const target = parseFloat(el.dataset.target || el.textContent);
      const suffix = el.dataset.suffix || '';
      const dur = 1400;
      const t0 = performance.now();

      (function tick(now) {
        const t = Math.min((now - t0) / dur, 1);
        el.textContent = Math.round(easeOut(t) * target) + suffix;
        if (t < 1) requestAnimationFrame(tick);
      })(t0);
    }

    const co = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { run(e.target); co.unobserve(e.target); }
      });
    }, { threshold: 0.4 });
    counters.forEach(function (el) { co.observe(el); });
  }

  /* ===== 4. SIDE DOTS ACTIVE ===== */
  const dots = document.querySelectorAll('.side-dots a[data-section]');
  const sections = Array.from(dots).map(function (d) {
    return document.getElementById(d.dataset.section);
  }).filter(Boolean);

  if (dots.length && sections.length && 'IntersectionObserver' in window) {
    const so = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          dots.forEach(function (d) {
            d.classList.toggle('is-active',
              d.dataset.section === entry.target.id);
          });
        }
      });
    }, { threshold: 0.4, rootMargin: '-40% 0px -40% 0px' });
    sections.forEach(function (s) { so.observe(s); });
  }
})();