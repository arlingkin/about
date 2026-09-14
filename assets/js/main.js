const path = location.pathname.replace(/\/$/, '') || '/';

function setActiveNav() {
  document.querySelectorAll('.nav-link').forEach((link) => {
    const href = link.getAttribute('href') || '';
    if (href.startsWith('http')) return;
    const target = href.split('#')[0].replace(/\.html$/, '');
    const here = path === '/' ? '/index' : path;
    if (here === target) link.classList.add('active');
  });
}

function revealOnScroll() {
  const els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('in'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  els.forEach((el) => io.observe(el));
}

function initCopyEmail() {
  document.querySelectorAll('[data-copy]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const email = btn.getAttribute('data-copy');
      try {
        await navigator.clipboard.writeText(email);
      } catch (e) {
        const ta = document.createElement('textarea');
        ta.value = email;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        ta.remove();
      }
      const original = btn.textContent;
      btn.textContent = 'copied ✓';
      setTimeout(() => { btn.textContent = original; }, 1600);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setActiveNav();
  revealOnScroll();
  initCopyEmail();
}, { once: true });