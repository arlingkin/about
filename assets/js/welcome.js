(() => {
  const root = document.querySelector('.wl');
  if (!root) return;

  const KEY = 'arlingkin-onboarded';
  const TOTAL = 4;
  const TARGET = { browse: '/', projects: '/projects', notes: '/notes' };
  const NAV = { browse: 'nav.home', projects: 'nav.projects', notes: 'nav.notes' };
  const REST = { 1: 'wave', 2: 'type', 3: 'wave', 4: 'win' };
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const store = {
    get: k => { try { return localStorage.getItem(k); } catch { return null; } },
    set: (k, v) => { try { localStorage.setItem(k, v); } catch {} }
  };
  const $ = (s, r = root) => r.querySelector(s);
  const $$ = (s, r = root) => [...r.querySelectorAll(s)];
  const lang = () => (document.documentElement.lang === 'id' ? 'id' : 'en');
  const theme = () => (document.documentElement.dataset.theme === 'light' ? 'light' : 'dark');
  const tr = (key, fb = '') => (T[key] && (T[key][lang()] || T[key].en)) || fb;
  const bin = n => Array.from({ length: n }, () => (Math.random() < .5 ? '0' : '1')).join('');
  const pad = n => String(n).padStart(2, '0');
  const wait = ms => new Promise(r => setTimeout(r, ms));

  const fresh = document.documentElement.dataset.wlFresh === '1';
  const state = { step: 1, intent: 'browse', dir: 1 };
  const fig = $('[data-wl-fig]');
  let timer = null, runTimer = null, shaking = false, booting = false;

  const decode = (el, ms = 900) => {
    if (reduced.matches || !el) return;
    const key = el.dataset.i18n;
    const final = () => tr(key, el.textContent);
    const start = performance.now();
    const step = now => {
      const p = Math.min(1, (now - start) / ms);
      const text = final();
      const keep = Math.floor(text.length * p);
      el.textContent = text.slice(0, keep) + text.slice(keep).replace(/\S/g, () => (Math.random() < .5 ? '0' : '1'));
      if (p < 1) requestAnimationFrame(step); else el.textContent = final();
    };
    requestAnimationFrame(step);
  };

  const shake = () => {
    const el = $('[data-shake]');
    if (!el || shaking || reduced.matches) return;
    shaking = true;
    const text = el.textContent;
    el.textContent = text.replace(/\S/g, () => (Math.random() < .5 ? '0' : '1'));
    el.classList.add('is-shaking');
    setTimeout(() => { el.textContent = text; }, 110);
    setTimeout(() => { el.classList.remove('is-shaking'); shaking = false; }, 260);
  };

  const burst = (x, y) => {
    if (reduced.matches) return;
    const wrap = document.createElement('span');
    wrap.className = 'burst';
    wrap.style.left = `${x}px`;
    wrap.style.top = `${y}px`;
    const offset = Math.random() * 45;
    for (let i = 0; i < 8; i++) {
      const spark = document.createElement('i');
      const angle = (i * 45 + offset) * Math.PI / 180;
      const dist = 24 + Math.random() * 22;
      spark.style.setProperty('--x', `${(Math.cos(angle) * dist).toFixed(1)}px`);
      spark.style.setProperty('--y', `${(Math.sin(angle) * dist).toFixed(1)}px`);
      wrap.appendChild(spark);
    }
    wrap.addEventListener('animationend', e => { if (e.target === wrap) wrap.remove(); });
    setTimeout(() => wrap.remove(), 1200);
    document.body.appendChild(wrap);
  };

  const sync = () => {
    $$('[data-wl-lang]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.wlLang === lang())));
    $$('[data-wl-theme]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.wlTheme === theme())));
    $$('[data-wl-intent]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.wlIntent === state.intent)));
    const track = $('[data-wl-track]');
    track.setAttribute('aria-valuenow', state.step);
    track.setAttribute('aria-label', tr('welcome.progress', 'Setup progress'));
    $('[data-wl-count]').textContent = `${pad(state.step)} / ${pad(TOTAL)}`;
    $('[data-wl-back]').disabled = state.step === 1;
    $('[data-wl-next]').hidden = state.step === TOTAL;
    $('[data-wl-to]').textContent = tr('welcome.f.to').replace('{t}', tr(NAV[state.intent]));
  };

  const leave = () => {
    clearTimeout(timer);
    store.set(KEY, '1');
    location.replace(TARGET[state.intent]);
  };

  const finale = () => {
    store.set(KEY, '1');
    const title = $('[data-wl-granted]');
    decode(title, 900);
    setTimeout(() => {
      if (state.step !== TOTAL) return;
      const r = title.getBoundingClientRect();
      burst(r.left + r.width / 2, r.top + r.height / 2);
    }, 260);
    timer = setTimeout(leave, 1300);
  };

  const go = n => {
    n = Math.max(1, Math.min(TOTAL, n));
    if (n === state.step || booting) return;
    clearTimeout(timer);
    state.dir = n > state.step ? 1 : -1;
    state.step = n;
    root.dataset.step = n;
    root.style.setProperty('--wl-dx', `${state.dir * 28}px`);
    root.style.setProperty('--p', ((n - 1) / (TOTAL - 1)).toFixed(3));
    $$('[data-wl-step]').forEach(s => { s.hidden = Number(s.dataset.wlStep) !== n; });
    fig.dataset.dir = state.dir;
    fig.dataset.pose = 'run';
    clearTimeout(runTimer);
    runTimer = setTimeout(() => { fig.dataset.pose = REST[n]; }, reduced.matches ? 0 : 650);
    sync();
    const cur = $(`[data-wl-step="${n}"]`);
    if (n !== TOTAL) decode($('[data-decode]', cur), 700);
    $('h1, h2', cur).focus({ preventScroll: true });
    if (n === TOTAL) finale();
  };

  const preselect = () => {
    let q = '';
    try { q = new URLSearchParams(location.search).get('lang') || ''; } catch {}
    if (!q) {
      const want = /^id\b/i.test(navigator.language || '') ? 'id' : 'en';
      if (lang() !== want) applyLang(want);
    }
    const wantTheme = matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    if (theme() !== wantTheme) document.querySelector('.theme-toggle')?.click();
    root.dataset.auto = '';
  };

  const boot = async () => {
    const el = $('[data-wl-boot]'), pre = $('[data-wl-boot-text]'), wiz = $('[data-wl-wiz]');
    const h = new Date().getHours();
    const g = h < 5 ? 'late' : h < 12 ? 'morning' : h < 18 ? 'afternoon' : h < 22 ? 'evening' : 'night';
    const lines = [`> ${tr(`welcome.g.${g}`)}`, `> booting arlingkin ... ${bin(4)} ${bin(4)}`, `> lang=${lang()} theme=${theme()}`, `> ${tr('welcome.v.ready', 'ready')}_`];
    let stop;
    const stopped = new Promise(r => { stop = r; });
    const pause = ms => Promise.race([wait(ms), stopped]);
    let done = false;
    booting = true; el.hidden = false; wiz.inert = true;
    el.addEventListener('pointerdown', () => { done = true; stop(); }, { once: true });
    document.addEventListener('keydown', () => { done = true; stop(); }, { once: true });
    for (let i = 0; i < lines.length && !done; i++) {
      pre.textContent += `${i ? '\n' : ''}${lines[i]}`;
      await pause(320);
    }
    if (!done) await pause(260);
    el.classList.add('is-out');
    await wait(done ? 0 : 240);
    el.hidden = true; wiz.inert = false; booting = false;
  };

  root.addEventListener('click', e => {
    const l = e.target.closest('[data-wl-lang]');
    if (l) { if (lang() !== l.dataset.wlLang) applyLang(l.dataset.wlLang); root.removeAttribute('data-auto'); sync(); return; }
    const t = e.target.closest('[data-wl-theme]');
    if (t) {
      if (theme() !== t.dataset.wlTheme) document.querySelector('.theme-toggle')?.click();
      root.removeAttribute('data-auto'); sync(); return;
    }
    const i = e.target.closest('[data-wl-intent]');
    if (i) { state.intent = i.dataset.wlIntent; sync(); return; }
    if (e.target.closest('[data-wl-next]')) go(state.step + 1);
    else if (e.target.closest('[data-wl-back]')) go(state.step - 1);
    else if (e.target.closest('[data-wl-enter]')) leave();
    else if (e.target.closest('[data-wl-skip]')) store.set(KEY, '1');
  });

  document.addEventListener('click', e => {
    if (e.target.closest('.lang-btn, .theme-toggle')) setTimeout(sync, 0);
  });

  document.addEventListener('keydown', e => {
    if (booting || e.ctrlKey || e.metaKey || e.altKey || /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName) || e.target.isContentEditable) return;
    if (e.key === 'ArrowRight') go(state.step + 1);
    else if (e.key === 'ArrowLeft') go(state.step - 1);
    else if (e.key === 'Escape') { store.set(KEY, '1'); location.replace('/'); }
    else if (/^[1-3]$/.test(e.key)) $$('[data-wl-step]:not([hidden]) .wl-choice')[Number(e.key) - 1]?.click();
  });

  root.addEventListener('pointerover', e => { if (e.target.closest('[data-shake]')) shake(); });

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([en]) => root.classList.toggle('wl-off', !en.isIntersecting)).observe(root);
  }

  document.addEventListener('DOMContentLoaded', async () => {
    const intro = fresh && !store.get(KEY);
    if (fresh) preselect();
    sync();
    if (intro && !reduced.matches) await boot();
    decode($('[data-decode]'), 1000);
    setTimeout(shake, 500);
  }, { once: true });
})();
