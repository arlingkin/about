/* Arlingkin interactive header — additive layer */
(() => {
  const brand = document.querySelector('.brand');
  const header = document.querySelector('.site-header');
  if (!brand || !header) return;

  const pop = () => {
    brand.classList.remove('is-popping');
    void brand.offsetWidth;
    brand.classList.add('is-popping');
    window.setTimeout(() => brand.classList.remove('is-popping'), 700);
  };

  // The logo is still a normal link: click it to return home, with a small
  // tactile animation instead of a blocking interaction.
  brand.addEventListener('click', pop);
  brand.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') pop();
  });

  // Gentle pointer glow follows the header without moving the layout.
  const finePointer = window.matchMedia('(pointer: fine)');
  if (finePointer.matches) {
    header.addEventListener('pointermove', (event) => {
      const rect = header.getBoundingClientRect();
      header.style.setProperty('--header-glow-x', `${event.clientX - rect.left}px`);
      header.style.setProperty('--header-glow-y', `${event.clientY - rect.top}px`);
      header.classList.add('has-glow');
    });
    header.addEventListener('pointerleave', () => header.classList.remove('has-glow'));
  }

  // A small ambient pulse keeps the otherwise-static wordmark alive.
  window.setInterval(() => {
    if (document.hidden || brand.matches(':hover')) return;
    pop();
  }, 12000);

  const greeting = document.querySelector('[data-greeting]');
  const updateGreeting = () => {
    if (!greeting) return;
    const hour = new Date().getHours();
    const lang = document.documentElement.lang === 'id' ? 'id' : 'en';
    const key = hour < 5 ? 'late' : hour < 12 ? 'morning' : hour < 18 ? 'afternoon' : hour < 22 ? 'evening' : 'night';
    const words = {
      en: { late: 'Still awake?', morning: 'Good morning.', afternoon: 'Good afternoon.', evening: 'Good evening.', night: 'Good night.' },
      id: { late: 'Masih bangun?', morning: 'Selamat pagi.', afternoon: 'Selamat siang.', evening: 'Selamat malam.', night: 'Selamat malam.' }
    };
    greeting.textContent = words[lang][key];
  };
  updateGreeting();

  const themeToggle = document.querySelector('.theme-toggle');
  const applyTheme = (theme) => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('arlingkin-theme', theme);
    if (themeToggle) {
      themeToggle.setAttribute('aria-label', theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme');
      themeToggle.title = theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme';
      themeToggle.querySelector('.theme-label').textContent = theme === 'light' ? 'LIGHT' : 'DARK';
      themeToggle.querySelector('.theme-icon').textContent = theme === 'light' ? '☀' : '◐';
    }
  };
  applyTheme(localStorage.getItem('arlingkin-theme') || 'dark');
  themeToggle?.addEventListener('click', () => applyTheme(document.documentElement.dataset.theme === 'light' ? 'dark' : 'light'));

  const progress = document.createElement('div');
  progress.className = 'scroll-progress';
  document.body.appendChild(progress);
  const updateProgress = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    progress.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
  };
  addEventListener('scroll', updateProgress, { passive: true });
  addEventListener('resize', updateProgress);
  updateProgress();

  const marqueeTrack = document.querySelector('.tool-marquee-track');
  if (marqueeTrack) {
    const items = [...marqueeTrack.children];
    items.forEach(item => marqueeTrack.appendChild(item.cloneNode(true)));
  }

  document.querySelectorAll('.cta, .read-link, .project-link').forEach(el => {
    el.addEventListener('pointerdown', () => {
      el.classList.remove('is-pressed');
      void el.offsetWidth;
      el.classList.add('is-pressed');
    });
  });

  document.addEventListener('click', (event) => {
    if (event.target.closest('.lang-btn')) window.setTimeout(updateGreeting, 0);
  });

})();
