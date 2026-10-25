(() => {
  const brand = document.querySelector('.brand');
  const header = document.querySelector('.site-header');
  if (!brand || !header) return;

  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = matchMedia('(pointer: fine)');
  const controller = new AbortController();
  const { signal } = controller;
  const opts = { signal };

  const navToggle = header.querySelector('.nav-toggle');
  const menu = header.querySelector('nav');
  if (navToggle && menu) {
    const setNav = open => { header.classList.toggle('nav-open', open); navToggle.setAttribute('aria-expanded', String(open)); };
    navToggle.addEventListener('click', () => setNav(!header.classList.contains('nav-open')), opts);
    menu.addEventListener('click', e => { if (e.target.closest('a')) setNav(false); }, opts);
    header.addEventListener('keydown', e => { if (e.key === 'Escape' && header.classList.contains('nav-open')) { setNav(false); navToggle.focus(); } }, opts);
    matchMedia('(min-width: 701px)').addEventListener('change', e => { if (e.matches) setNav(false); }, opts);
  }

  let popTimeout = null;
  const pop = () => {
    brand.classList.remove('is-popping');
    void brand.offsetWidth;
    brand.classList.add('is-popping');
    clearTimeout(popTimeout);
    popTimeout = setTimeout(() => brand.classList.remove('is-popping'), 700);
  };

  brand.addEventListener('click', pop, opts);
  brand.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') pop(); }, opts);

  if (finePointer.matches) {
    let glowFrame = null;
    let gx = 0, gy = 0;
    const paintGlow = () => {
      header.style.setProperty('--header-glow-x', `${gx}px`);
      header.style.setProperty('--header-glow-y', `${gy}px`);
      glowFrame = null;
    };
    header.addEventListener('pointermove', e => {
      const rect = header.getBoundingClientRect();
      gx = e.clientX - rect.left;
      gy = e.clientY - rect.top;
      header.classList.add('has-glow');
      if (glowFrame === null) glowFrame = requestAnimationFrame(paintGlow);
    }, { ...opts, passive: true });
    header.addEventListener('pointerleave', () => header.classList.remove('has-glow'), opts);
  }

  let popTimer = null;
  const startAmbient = () => {
    if (popTimer !== null || reduced.matches) return;
    popTimer = setInterval(() => { if (!brand.matches(':hover')) pop(); }, 12000);
  };
  const stopAmbient = () => { clearInterval(popTimer); popTimer = null; };
  document.addEventListener('visibilitychange', () => (document.hidden ? stopAmbient() : startAmbient()), opts);
  startAmbient();

  const greeting = document.querySelector('[data-greeting]');
  const GREETINGS = {
    en: { late: 'Still awake?', morning: 'Good morning.', afternoon: 'Good afternoon.', evening: 'Good evening.', night: 'Good night.' },
    id: { late: 'Masih bangun?', morning: 'Selamat pagi.', afternoon: 'Selamat siang.', evening: 'Selamat malam.', night: 'Selamat malam.' }
  };
  const updateGreeting = () => {
    if (!greeting) return;
    const hour = new Date().getHours();
    const lang = document.documentElement.lang === 'id' ? 'id' : 'en';
    const key = hour < 5 ? 'late' : hour < 12 ? 'morning' : hour < 18 ? 'afternoon' : hour < 22 ? 'evening' : 'night';
    greeting.textContent = GREETINGS[lang][key];
  };
  updateGreeting();

  const themeToggle = document.querySelector('.theme-toggle');
  const metaTheme = document.querySelector('meta[name="theme-color"]');
  const metaScheme = document.querySelector('meta[name="color-scheme"]');
  const THEME_COLOR = { dark: '#071a3b', light: '#e8f0ff' };
  const applyTheme = theme => {
    const light = theme === 'light';
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem('arlingkin-theme', theme); } catch {}
    metaTheme?.setAttribute('content', THEME_COLOR[theme]);
    metaScheme?.setAttribute('content', light ? 'light' : 'dark');
    if (!themeToggle) return;
    const label = light ? 'Switch to dark theme' : 'Switch to light theme';
    themeToggle.setAttribute('aria-label', label);
    themeToggle.title = label;
    themeToggle.querySelector('.theme-label').textContent = light ? 'LIGHT' : 'DARK';
    themeToggle.querySelector('.theme-icon').textContent = light ? '☀' : '◐';
  };
  let savedTheme = 'dark';
  try { savedTheme = localStorage.getItem('arlingkin-theme') || 'dark'; } catch {}
  applyTheme(savedTheme === 'light' ? 'light' : 'dark');
  themeToggle?.addEventListener('click', () => applyTheme(document.documentElement.dataset.theme === 'light' ? 'dark' : 'light'), opts);

  const progress = document.createElement('div');
  progress.className = 'scroll-progress';
  progress.setAttribute('aria-hidden', 'true');
  document.body.appendChild(progress);
  let progressFrame = null, maxScroll = 0;
  const paintProgress = () => {
    progress.style.transform = `scaleX(${maxScroll > 0 ? Math.min(scrollY / maxScroll, 1) : 0})`;
    progressFrame = null;
  };
  const scheduleProgress = () => { if (progressFrame === null) progressFrame = requestAnimationFrame(paintProgress); };
  const measureProgress = () => { maxScroll = document.documentElement.scrollHeight - innerHeight; scheduleProgress(); };
  const progressObserver = 'ResizeObserver' in window ? new ResizeObserver(measureProgress) : null;
  progressObserver?.observe(document.body);
  addEventListener('scroll', scheduleProgress, { ...opts, passive: true });
  addEventListener('resize', measureProgress, opts);
  measureProgress();

  const marqueeWrap = document.querySelector('[data-marquee]');
  const firstTrack = marqueeWrap?.querySelector('.tool-marquee-track');
  let marqueeObserver = null;
  if (firstTrack && !firstTrack.dataset.ready) {
    const softenClone = (node, isDuplicate) => {
      const clone = node.cloneNode(true);
      clone.tabIndex = -1;
      clone.setAttribute('aria-hidden', 'true');
      if (isDuplicate) clone.dataset.clone = '1';
      return clone;
    };
    const reverseTrack = firstTrack.cloneNode(false);
    reverseTrack.className = 'tool-marquee-track is-reverse';
    reverseTrack.setAttribute('aria-hidden', 'true');
    [...firstTrack.children].reverse().forEach(chip => reverseTrack.appendChild(softenClone(chip, false)));
    marqueeWrap.appendChild(reverseTrack);
    marqueeWrap.querySelectorAll('.tool-marquee-track').forEach(track => {
      track.dataset.ready = '1';
      [...track.children].forEach(chip => track.appendChild(softenClone(chip, true)));
    });

    let spotFrame = null;
    marqueeWrap.addEventListener('pointermove', e => {
      const chip = e.target.closest('.tool-chip');
      if (!chip || spotFrame !== null) return;
      const { clientX, clientY } = e;
      spotFrame = requestAnimationFrame(() => {
        const rect = chip.getBoundingClientRect();
        chip.style.setProperty('--px', `${clientX - rect.left}px`);
        chip.style.setProperty('--py', `${clientY - rect.top}px`);
        spotFrame = null;
      });
    }, { ...opts, passive: true });

    if ('IntersectionObserver' in window) {
      marqueeObserver = new IntersectionObserver(([entry]) => {
        marqueeWrap.classList.toggle('is-offscreen', !entry.isIntersecting);
      });
      marqueeObserver.observe(marqueeWrap);
    }
  }

  document.querySelectorAll('.cta, .read-link, .project-link').forEach(el => {
    el.addEventListener('pointerdown', () => {
      el.classList.remove('is-pressed');
      void el.offsetWidth;
      el.classList.add('is-pressed');
    }, opts);
  });

  document.querySelectorAll('[data-current-path]').forEach(el => {
    el.textContent = decodeURIComponent(location.pathname).slice(0, 48);
  });

  document.addEventListener('click', e => {
    if (e.target.closest('.lang-btn')) setTimeout(updateGreeting, 0);
  }, opts);

  addEventListener('pagehide', () => {
    stopAmbient();
    clearTimeout(popTimeout);
    if (progressFrame !== null) cancelAnimationFrame(progressFrame);
    progressObserver?.disconnect();
    marqueeObserver?.disconnect();
    controller.abort();
  }, { once: true });
})();

(() => {
  const KEY = 'arlingkin-bg';
  const root = document.documentElement;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const controller = new AbortController();
  const opts = { signal: controller.signal };
  let channel = null;
  try { channel = new BroadcastChannel(KEY); } catch {}

  const rand = (min, max) => min + Math.random() * (max - min);
  const idle = cb => ('requestIdleCallback' in window ? requestIdleCallback(cb, { timeout: 1000 }) : setTimeout(cb, 150));
  const isPalette = v => v && [v.a, v.b, v.c].every(Number.isFinite);
  let current = { a: 158, b: 196, c: 330 };
  let alt = false;

  const setVars = (prefix, palette) => {
    root.style.setProperty(`${prefix}a`, palette.a);
    root.style.setProperty(`${prefix}b`, palette.b);
    root.style.setProperty(`${prefix}c`, palette.c);
  };

  let swapping = false, swapTimer = null;
  const paint = palette => {
    if (swapping) return false;
    swapping = true;
    current = palette;
    alt = !alt;
    setVars(alt ? '--bg2-' : '--bg-', palette);
    root.classList.add('bg-swap');
    root.style.setProperty('--acc-h', palette.a);
    root.classList.toggle('bg-alt', alt);
    swapTimer = setTimeout(() => { root.classList.remove('bg-swap'); swapping = false; }, 1900);
    return true;
  };

  const paintInstant = palette => {
    root.classList.add('bg-instant');
    current = palette;
    root.style.setProperty('--acc-h', palette.a);
    alt = false;
    setVars('--bg-', palette);
    setVars('--bg2-', palette);
    root.classList.remove('bg-alt');
    requestAnimationFrame(() => requestAnimationFrame(() => root.classList.remove('bg-instant')));
  };

  const readStored = () => {
    try {
      const value = JSON.parse(localStorage.getItem(KEY));
      return isPalette(value) ? value : null;
    } catch { return null; }
  };

  const pickHue = () => {
    let hue = 0;
    for (let i = 0; i < 6; i++) {
      hue = rand(0, 305);
      if (hue > 195) hue += 60;
      const diff = Math.abs(hue - current.a) % 360;
      if (Math.min(diff, 360 - diff) >= 50) break;
    }
    return Math.round(hue);
  };

  const nextPalette = () => {
    const a = pickHue();
    return { a, b: Math.round(a + rand(28, 70)), c: Math.round(a + rand(150, 210)) };
  };

  const shuffle = () => {
    if (document.hidden) return;
    const palette = nextPalette();
    if (!paint(palette)) return;
    try { localStorage.setItem(KEY, JSON.stringify(palette)); } catch {}
    channel?.postMessage(palette);
  };

  const receive = palette => {
    if (isPalette(palette) && palette.a !== current.a) paint(palette);
  };

  const stored = readStored();
  paintInstant(stored || current);


  channel?.addEventListener('message', e => receive(e.data), opts);
  addEventListener('storage', e => {
    if (e.key !== KEY || !e.newValue) return;
    try { receive(JSON.parse(e.newValue)); } catch {}
  }, opts);

  if (!reduced.matches) {
    let lastY = scrollY, dir = 0, travelled = 0, lastChange = 0, frame = null;
    const step = () => {
      frame = null;
      const y = scrollY;
      const delta = y - lastY;
      lastY = y;
      if (!delta) return;
      const nextDir = Math.sign(delta);
      if (nextDir !== dir) { dir = nextDir; travelled = 0; }
      travelled += Math.abs(delta);
      const now = performance.now();
      if (travelled >= Math.max(360, innerHeight * .6) && now - lastChange > 3000) {
        travelled = 0;
        lastChange = now;
        idle(shuffle);
      }
    };
    addEventListener('scroll', () => { if (frame === null) frame = requestAnimationFrame(step); }, { ...opts, passive: true });
  }

  addEventListener('pagehide', () => {
    clearTimeout(swapTimer);
    channel?.close();
    controller.abort();
  }, { once: true });
})();

(() => {
  if (HTMLScriptElement.supports?.('speculationrules')) return;
  const controller = new AbortController();
  const seen = new Set();
  const prefetch = event => {
    const link = event.target.closest?.('a[href^="/"]');
    if (!link || link.target === '_blank' || seen.has(link.pathname)) return;
    seen.add(link.pathname);
    const tag = document.createElement('link');
    tag.rel = 'prefetch';
    tag.href = link.href;
    document.head.appendChild(tag);
  };
  const opts = { signal: controller.signal, passive: true, capture: true };
  document.addEventListener('pointerover', prefetch, opts);
  document.addEventListener('touchstart', prefetch, opts);
  document.addEventListener('focusin', prefetch, opts);
  addEventListener('pagehide', () => controller.abort(), { once: true });
})();

(() => {
  const finePointer = matchMedia('(pointer: fine)');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const controller = new AbortController();
  const opts = { signal: controller.signal, passive: true };
  const SPOT = '.article, .skill, .icon-card, .auto-card, .contact-card, .project-row';
  const MAGNET = '.cta, .read-link, .to-top, .footer-copy, .theme-toggle';
  let glow = null, frame = null, last = null, magnet = null, glowOn = false, live = 0;

  const resetMagnet = () => {
    if (!magnet) return;
    magnet.style.translate = '';
    magnet = null;
  };

  const render = () => {
    frame = null;
    if (!last) return;
    const { x, y, target } = last;
    if (glow) {
      glow.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      if (!glowOn) { glowOn = true; glow.classList.add('on'); }
    }
    const card = target?.closest?.(SPOT);
    if (card) {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--px', `${x - rect.left}px`);
      card.style.setProperty('--py', `${y - rect.top}px`);
    }
    if (reduced.matches) return;
    const el = target?.closest?.(MAGNET);
    if (el !== magnet) resetMagnet();
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = (x - rect.left - rect.width / 2) / rect.width;
    const dy = (y - rect.top - rect.height / 2) / rect.height;
    el.style.translate = `${(dx * 10).toFixed(1)}px ${(dy * 8).toFixed(1)}px`;
    magnet = el;
  };

  if (finePointer.matches) {
    if (!reduced.matches) {
      glow = document.createElement('div');
      glow.className = 'cursor-glow';
      glow.setAttribute('aria-hidden', 'true');
      document.body.appendChild(glow);
    }
    document.addEventListener('pointermove', e => {
      if (e.pointerType !== 'mouse') return;
      last = { x: e.clientX, y: e.clientY, target: e.target };
      if (frame === null) frame = requestAnimationFrame(render);
    }, opts);
    document.documentElement.addEventListener('pointerleave', () => {
      resetMagnet();
      glowOn = false;
      glow?.classList.remove('on');
    }, opts);
  }

  const burst = (x, y) => {
    if (live >= 5) return;
    live += 1;
    const wrap = document.createElement('span');
    wrap.className = 'burst';
    wrap.style.left = `${x}px`;
    wrap.style.top = `${y}px`;
    const count = 8;
    const offset = Math.random() * 45;
    for (let i = 0; i < count; i++) {
      const spark = document.createElement('i');
      const angle = ((i * 360) / count + offset) * Math.PI / 180;
      const dist = 24 + Math.random() * 22;
      spark.style.setProperty('--x', `${(Math.cos(angle) * dist).toFixed(1)}px`);
      spark.style.setProperty('--y', `${(Math.sin(angle) * dist).toFixed(1)}px`);
      wrap.appendChild(spark);
    }
    let done = false;
    const end = () => {
      if (done) return;
      done = true;
      wrap.remove();
      live -= 1;
    };
    wrap.addEventListener('animationend', e => { if (e.target === wrap) end(); });
    setTimeout(end, 1200);
    document.body.appendChild(wrap);
  };

  document.addEventListener('pointerdown', e => {
    if (reduced.matches || e.button > 0) return;
    if (e.target.closest?.('a, button')) burst(e.clientX, e.clientY);
  }, opts);

  addEventListener('pagehide', () => {
    if (frame !== null) cancelAnimationFrame(frame);
    glow?.remove();
    controller.abort();
  }, { once: true });
})();

(() => {
  const mark = document.querySelector('.footer-mark');
  if (!mark) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = matchMedia('(pointer: fine)');
  const controller = new AbortController();
  const opts = { signal: controller.signal };
  const letters = [...mark.textContent.trim()];
  mark.textContent = '';
  letters.forEach((ch, i) => {
    const span = document.createElement('span');
    span.className = 'fm-l';
    span.textContent = ch;
    span.style.setProperty('--i', i);
    span.style.setProperty('--r', i % 2 ? 1 : -1);
    if (ch === 'i') span.dataset.hero = '';
    mark.appendChild(span);
  });
  const last = mark.lastElementChild;
  let running = false, seen = false, inView = false, guard = null, frame = null;
  const release = () => {
    clearTimeout(guard);
    mark.classList.remove('is-hopping', 'is-entering');
    running = false;
  };
  const hop = () => {
    if (running || reduced.matches || !last) return;
    running = true;
    mark.classList.add('is-hopping');
    guard = setTimeout(release, 3500);
  };
  const enter = () => {
    if (running || reduced.matches || !last) return;
    running = true;
    mark.classList.remove('is-armed');
    mark.classList.add('is-entering');
    guard = setTimeout(release, 4500);
  };
  if (!reduced.matches && last) mark.classList.add('is-armed');
  mark.addEventListener('click', hop, opts);
  mark.addEventListener('animationend', event => {
    if (event.target !== last) return;
    if (event.animationName === 'fm-in') { release(); hop(); }
    else if (event.animationName.startsWith('fm-hop')) release();
  }, opts);

  if (finePointer.matches && !reduced.matches) {
    let px = -9999, py = 0;
    const paint = () => {
      mark.style.setProperty('--mx', `${px}px`);
      mark.style.setProperty('--my', `${py}px`);
      frame = null;
    };
    mark.addEventListener('pointermove', e => {
      const rect = mark.getBoundingClientRect();
      px = e.clientX - rect.left;
      py = e.clientY - rect.top;
      if (frame === null) frame = requestAnimationFrame(paint);
    }, { ...opts, passive: true });
    mark.addEventListener('pointerleave', () => { px = -9999; paint(); }, opts);
  }

  let prevY = scrollY;
  const observer = new IntersectionObserver(([entry]) => {
    const down = scrollY > prevY;
    prevY = scrollY;
    if (!entry.isIntersecting) { inView = false; return; }
    if (!seen) { seen = true; enter(); }
    else if (!inView && down) hop();
    inView = true;
  }, { threshold: 0.55 });
  observer.observe(mark);
  const vis = new IntersectionObserver(([e]) => mark.classList.toggle('is-visible', e.isIntersecting));
  vis.observe(mark);
  addEventListener('pagehide', () => {
    clearTimeout(guard);
    if (frame !== null) cancelAnimationFrame(frame);
    observer.disconnect(); vis.disconnect();
    controller.abort();
  }, { once: true });
})();

(() => {
  if (!matchMedia('(hover: hover) and (pointer: fine)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const SEL = '.article, .skill, .icon-card, .contact-card';
  let frame = null, x = 0, y = 0, target = null;
  const paint = () => {
    frame = null;
    const r = target.getBoundingClientRect();
    target.style.setProperty('--mx', `${x - r.left}px`);
    target.style.setProperty('--my', `${y - r.top}px`);
  };
  document.addEventListener('pointermove', e => {
    const t = e.target.closest?.(SEL);
    if (!t) return;
    target = t; x = e.clientX; y = e.clientY;
    if (frame === null) frame = requestAnimationFrame(paint);
  }, { passive: true });
})();

(() => {
  const header = document.querySelector('.site-header');
  if (!header || document.querySelector('.nf')) return;
  let segs;
  try { segs = decodeURIComponent(location.pathname).replace(/\.html$/, '').split('/').filter(Boolean); } catch { return; }
  if (segs[segs.length - 1] === 'index') segs.pop();
  if (!segs.length) return;
  const trail = document.createElement('nav');
  trail.className = 'crumbs';
  trail.setAttribute('aria-label', 'Breadcrumb');
  const ol = document.createElement('ol');
  const add = (label, href, key) => {
    const li = document.createElement('li');
    const el = document.createElement(href ? 'a' : 'span');
    if (href) el.href = href; else el.setAttribute('aria-current', 'page');
    if (key && typeof T !== 'undefined' && T[key]) el.setAttribute('data-i18n', key);
    el.textContent = label;
    li.appendChild(el);
    ol.appendChild(li);
  };
  add('home', '/', 'nav.home');
  segs.forEach((seg, i) => {
    const key = `nav.${seg}`;
    const known = typeof T !== 'undefined' && T[key] && i === 0;
    add(known ? T[key].en : seg, i < segs.length - 1 ? `/${segs.slice(0, i + 1).join('/')}` : null, known ? key : null);
  });
  trail.appendChild(ol);
  header.insertAdjacentElement('afterend', trail);
})();

(() => {
  const svgs = [...document.querySelectorAll('.sr-fig svg')];
  if (!svgs.length || !svgs[0].pauseAnimations) return;
  svgs.forEach(s => s.pauseAnimations());
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver(entries => entries.forEach(e => (e.isIntersecting ? e.target.unpauseAnimations() : e.target.pauseAnimations())), { threshold: .2 });
  svgs.forEach(s => io.observe(s));
  addEventListener('pagehide', () => io.disconnect(), { once: true });
})();

(() => {
  const logo = document.querySelector('.footer-logo');
  const footer = document.querySelector('.site-footer');
  const label = logo && logo.querySelector('.fl-text');
  if (!logo || !footer || !label) return;
  const WORD = label.dataset.text || label.textContent.trim();
  const GLYPHS = '01#$%&@/<>_=+*~';
  const VARS = ['--dx', '--dy', '--sk', '--cs', '--mx', '--lo', '--sl', '--op', '--a1', '--a2', '--b1', '--b2', '--hotc', '--g1', '--g2', '--g3', '--gy', '--hud', '--hs', '--eye'];
  const MODES = {
    twitch: { n: [2, 4], amp: .25, scr: 0, tear: .2, gap: [16, 34] },
    slide: { n: [6, 10], amp: 1, scr: .55, tear: .5, gap: [28, 70], snap: 4 },
    tear: { n: [5, 9], amp: .55, scr: .3, tear: 1, gap: [24, 60] },
    decode: { n: [7, 12], amp: .3, scr: .95, tear: .25, gap: [45, 90] },
    blackout: { n: [2, 3], amp: .7, scr: .2, tear: .8, gap: [30, 70], dim: true },
    scan: { n: [8, 13], amp: .12, scr: .15, tear: .1, gap: [55, 95] }
  };
  const NEXT = {
    start: { twitch: .4, slide: .25, tear: .1, scan: .25 },
    twitch: { slide: .45, tear: .2, decode: .1, scan: .25 },
    slide: { tear: .25, decode: .3, scan: .2, end: .25 },
    tear: { slide: .15, decode: .3, scan: .2, end: .35 },
    decode: { end: .65, blackout: .2, scan: .15 },
    blackout: { decode: .5, scan: .2, end: .3 },
    scan: { decode: .55, end: .35, blackout: .1 }
  };
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const controller = new AbortController();
  const opts = { signal: controller.signal };
  let seed = (Date.now() ^ Math.floor(performance.now() * 1000)) >>> 0;
  const rnd = () => {
    seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const lattice = Array.from({ length: 64 }, rnd);
  const noise = x => {
    const i = Math.floor(x);
    const f = x - i;
    const u = f * f * (3 - 2 * f);
    return lattice[i & 63] * (1 - u) + lattice[(i + 1) & 63] * u;
  };
  const between = (a, b) => a + rnd() * (b - a);
  const glyph = () => GLYPHS[Math.floor(rnd() * GLYPHS.length)];
  const pick = table => {
    let r = rnd();
    for (const [key, weight] of Object.entries(table)) if ((r -= weight) < 0) return key;
    return 'end';
  };
  const put = (k, v) => logo.style.setProperty(k, v);
  const hud = document.createElement('span');
  hud.className = 'fl-hud';
  hud.setAttribute('aria-hidden', 'true');
  logo.append(hud);
  const hex = () => Math.floor(rnd() * 65536).toString(16).padStart(4, '0');
  const readout = (n, locked) => [
    `SCAN [${'#'.repeat(Math.min(6, n + 1)).padEnd(6, '-')}]`,
    'ID ARLINGKIN',
    locked ? 'TARGET LOCKED' : `MATCH ${Math.min(99, 38 + n * 9 + Math.floor(rnd() * 6))}%`,
    `${hex()} ${hex()}`
  ].slice(0, locked ? 4 : Math.min(4, 1 + Math.floor(n / 2))).join('\n');
  let loopTimer = null, frameTimer = null, visible = false, busy = false;

  const rest = () => {
    logo.classList.remove('is-glitch', 'is-scan');
    footer.classList.remove('is-scan');
    hud.textContent = '';
    VARS.forEach(k => logo.style.removeProperty(k));
    label.textContent = WORD;
    label.dataset.a = '';
    label.dataset.b = '';
    busy = false;
  };

  const frames = power => {
    const list = [];
    for (let mode = pick(NEXT.start), segs = 0; mode !== 'end' && segs < 4; mode = pick(NEXT[mode]), segs++) {
      const count = Math.round(between(...MODES[mode].n) * (.7 + .3 * power));
      for (let k = 0; k < count; k++) list.push(mode);
    }
    return list;
  };

  const burst = (power = 1) => {
    if (busy || reduced.matches) return;
    busy = true;
    const plan = frames(power);
    const total = plan.length;
    const reach = between(10, 26) * power;
    const lock = [...WORD].map(() => between(.3, 1));
    const trail = [0, 0, 0];
    let f = 0;
    let scanned = 0;
    let clock = rnd() * 100;
    logo.classList.add('is-glitch');
    const scramble = strength => [...WORD].map((ch, i) => (rnd() < strength && f / total * 1.2 < lock[i] + .2 ? glyph() : ch)).join('');
    const step = () => {
      const m = MODES[plan[f]];
      const scan = plan[f] === 'scan';
      const env = .35 + .65 * Math.pow(Math.sin(Math.PI * Math.min(1, f / (total - 1) * 1.1)), .7);
      clock += between(.08, .3);
      const kick = rnd() < .2 ? between(.2, 1) : 1;
      const snap = m.snap || 1;
      const raw = ((rnd() < .12 ? -.3 : between(.3, 1)) * kick * m.amp * reach + (noise(clock * 3) * 2 - 1) * 2.5 * m.amp) * env;
      const dx = Math.round(raw / snap) * snap;
      const a1 = between(0, 68), b1 = between(0, 68);
      const band = 14 + 22 * m.tear;
      put('--dx', dx + 'px');
      put('--dy', (between(-1.5, 1.5) * env * power).toFixed(1) + 'px');
      put('--sk', (between(-9, 9) * env * (.4 + .6 * m.tear)).toFixed(1) + 'deg');
      put('--cs', (1 + 3.5 * env * rnd() * (.6 + .4 * m.tear)).toFixed(1) + 'px');
      put('--mx', ((rnd() - .5) * 8 * env).toFixed(1) + 'px');
      put('--lo', (.5 + .45 * rnd()).toFixed(2));
      put('--sl', (.3 + .5 * rnd()).toFixed(2));
      put('--op', m.dim && rnd() < .6 ? between(.15, .45).toFixed(2) : '1');
      put('--a1', a1.toFixed(0) + '%');
      put('--a2', Math.max(0, 100 - a1 - between(10, band)).toFixed(0) + '%');
      put('--b1', b1.toFixed(0) + '%');
      put('--b2', Math.max(0, 100 - b1 - between(10, band)).toFixed(0) + '%');
      put('--hotc', scan ? 'var(--orange)' : rnd() < .25 ? 'var(--link)' : '');
      logo.classList.toggle('is-scan', scan);
      footer.classList.toggle('is-scan', scan);
      put('--hud', scan && rnd() < .9 ? '1' : '0');
      if (scan) {
        put('--hs', Math.max(1, 1.45 - scanned * .12 + (rnd() - .5) * .04).toFixed(2));
        put('--eye', (.5 + .5 * rnd()).toFixed(2));
        hud.textContent = readout(scanned, plan[f + 1] !== 'scan');
        scanned += 1;
      }
      put('--g1', trail[0] - dx + 'px');
      put('--g2', trail[1] - trail[0] + 'px');
      put('--g3', trail[2] - trail[1] + 'px');
      put('--gy', between(-1, 1).toFixed(1) + 'px');
      trail.unshift(dx);
      trail.length = 3;
      label.textContent = scramble(m.scr);
      label.dataset.a = scramble(Math.min(1, m.scr + .25));
      label.dataset.b = scramble(Math.min(1, m.scr + .25));
      f += 1;
      if (f >= total) {
        rest();
        if (rnd() < .25) frameTimer = setTimeout(() => burst(power * .7), between(200, 520));
        return;
      }
      frameTimer = setTimeout(step, between(...MODES[plan[f]].gap) + (rnd() < .15 ? between(50, 120) : 0));
    };
    step();
  };

  const nextDelay = () => Math.min(11000, 1800 + -Math.log(1 - rnd()) * 4200);
  const loop = first => {
    clearTimeout(loopTimer);
    if (!visible || document.hidden || reduced.matches) return;
    loopTimer = setTimeout(() => { burst(between(.6, 1)); loop(false); }, first ? between(700, 1500) : nextDelay());
  };

  logo.addEventListener('pointerenter', () => burst(1), opts);
  logo.addEventListener('focusin', () => burst(.8), opts);
  document.addEventListener('visibilitychange', () => loop(false), opts);
  const observer = 'IntersectionObserver' in window ? new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) loop(true); else clearTimeout(loopTimer);
  }, { threshold: .15 }) : null;
  if (observer) observer.observe(footer);
  addEventListener('pagehide', () => {
    clearTimeout(loopTimer);
    clearTimeout(frameTimer);
    if (observer) observer.disconnect();
    controller.abort();
  }, { once: true });
})();
