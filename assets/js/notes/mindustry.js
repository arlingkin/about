(() => {
  const fig = document.querySelector('.md-fig');
  const svg = fig?.querySelector('svg');
  const btn = fig?.querySelector('[data-md-toggle]');
  const me = svg?.querySelector('.md-me');
  const fx = svg?.querySelector('.md-fx');
  if (!fig || !svg || !btn || !me || !fx || !svg.pauseAnimations) return;

  const NS = 'http://www.w3.org/2000/svg';
  const W = 680, H = 260;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const controller = new AbortController();
  const opts = { signal: controller.signal };
  const lang = () => (document.documentElement.lang === 'id' ? 'id' : 'en');
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

  let userPaused = reduced.matches;
  let visible = false;
  let ax = W / 2, ay = H / 2, tx = ax, ty = ay;
  let raf = null, idle = null, live = 0;

  const label = () => {
    const key = userPaused ? 'note3.play' : 'note3.pause';
    const entry = typeof T !== 'undefined' ? T[key] : null;
    btn.setAttribute('data-i18n', key);
    btn.textContent = entry ? (entry[lang()] || entry.en) : (userPaused ? 'PLAY' : 'PAUSE');
    btn.setAttribute('aria-pressed', String(userPaused));
  };
  const sync = () => {
    const run = visible && !userPaused && !document.hidden;
    if (run) svg.unpauseAnimations(); else svg.pauseAnimations();
  };

  const toSvg = e => {
    const r = svg.getBoundingClientRect();
    return [clamp((e.clientX - r.left) * W / r.width, 8, W - 8), clamp((e.clientY - r.top) * H / r.height, 8, H - 8)];
  };

  const step = () => {
    raf = null;
    const dx = tx - ax, dy = ty - ay;
    ax += dx * .16;
    ay += dy * .16;
    me.setAttribute('transform', `translate(${ax.toFixed(1)} ${ay.toFixed(1)}) rotate(${clamp(dx * .5, -24, 24).toFixed(1)})`);
    if (Math.abs(dx) + Math.abs(dy) > .3) raf = requestAnimationFrame(step);
  };

  const engage = (x, y) => {
    if (!fig.classList.contains('is-manual')) {
      const auto = svg.querySelector('.md-auto').getBoundingClientRect();
      const box = svg.getBoundingClientRect();
      ax = clamp((auto.left + auto.width / 2 - box.left) * W / box.width, 8, W - 8);
      ay = clamp((auto.top + auto.height / 2 - box.top) * H / box.height, 8, H - 8);
      fig.classList.add('is-manual');
    }
    tx = x;
    ty = y;
    if (raf === null) raf = requestAnimationFrame(step);
    clearTimeout(idle);
    idle = setTimeout(() => fig.classList.remove('is-manual'), 3500);
  };

  const fire = (x, y) => {
    if (live >= 8) return;
    live += 1;
    const sx = ax, sy = ay;
    const dist = Math.hypot(x - sx, y - sy);
    const bullet = document.createElementNS(NS, 'circle');
    bullet.setAttribute('r', '2.4');
    bullet.setAttribute('class', 'md-bul');
    fx.appendChild(bullet);
    const flight = bullet.animate(
      [{ transform: `translate(${sx}px, ${sy}px)` }, { transform: `translate(${x}px, ${y}px)` }],
      { duration: clamp(dist * 1.1, 120, 420), easing: 'linear', fill: 'forwards' }
    );
    flight.onfinish = () => {
      bullet.remove();
      const spark = document.createElementNS(NS, 'circle');
      spark.setAttribute('cx', x.toFixed(1));
      spark.setAttribute('cy', y.toFixed(1));
      spark.setAttribute('r', '6');
      spark.setAttribute('class', 'md-spark');
      fx.appendChild(spark);
      const pop = spark.animate(
        [{ transform: 'scale(.3)', opacity: 1 }, { transform: 'scale(2.2)', opacity: 0 }],
        { duration: 380, easing: 'ease-out', fill: 'forwards' }
      );
      pop.onfinish = () => { spark.remove(); live -= 1; };
    };
  };

  svg.addEventListener('pointermove', e => {
    if (e.pointerType === 'touch') return;
    const [x, y] = toSvg(e);
    engage(x, y);
  }, opts);
  svg.addEventListener('pointerdown', e => {
    const [x, y] = toSvg(e);
    engage(x, y);
    fire(x, y);
  }, opts);

  btn.addEventListener('click', () => { userPaused = !userPaused; label(); sync(); }, opts);
  document.addEventListener('visibilitychange', sync, opts);
  document.addEventListener('click', e => { if (e.target.closest('.lang-btn')) setTimeout(label, 0); }, opts);

  const observer = 'IntersectionObserver' in window
    ? new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); })
    : null;
  if (observer) observer.observe(fig); else { visible = true; }

  if (userPaused) svg.setCurrentTime(5);
  label();
  sync();

  addEventListener('pagehide', () => {
    clearTimeout(idle);
    if (raf !== null) cancelAnimationFrame(raf);
    observer?.disconnect();
    controller.abort();
  }, { once: true });
})();
