const LANG_KEY = 'arlingkin-lang';
const path = location.pathname.replace(/\/$/, '') || '/';

/* ── translations ─────────────────────────────────────────────── */
const T = {
  'nav.home':     { en:'home',      id:'beranda' },
  'nav.about':    { en:'about',     id:'tentang' },
  'nav.skills':   { en:'skills',    id:'kemampuan' },
  'nav.projects': { en:'projects',  id:'proyek' },
  'nav.stats':    { en:'stats',     id:'statistik' },
  'nav.contact':  { en:'contact',   id:'kontak' },
  'nav.github':   { en:'github ↗',  id:'github ↗' },
  'footer.copy':  { en:'© 2026 Arlingkin. Built with care & plain HTML.', id:'© 2026 Arlingkin. Dibuat dengan teliti & HTML murni.' },
  'footer.hello': { en:'say hello ↗', id:'sapa saya ↗' },

  /* home */
  'home.eyebrow':      { en:'Personal notes / 2026',   id:'Catatan pribadi / 2026' },
  'home.h1':           { en:'Making sense of <em>code.</em>',  id:'Memahami <em>kode.</em>' },
  'home.intro':        { en:'Welcome to my quiet corner of the internet — building things, learning in public, and staying <strong>curious.</strong>', id:'Selamat datang di sudut tenang internet saya — membangun sesuatu, belajar di publik, dan tetap <strong>penasaran.</strong>' },
  'home.status':       { en:'vibe code, but with <em>human</em> sense', id:'vibe code, tapi dengan akal <em>manusia</em>' },
  'home.latest.label': { en:'01 / LATEST NOTE', id:'01 / CATATAN TERBARU' },
  'home.latest.link':  { en:'view projects',   id:'lihat proyek' },
  'home.latest.tag':   { en:'ESSAY · 06 MIN',  id:'ESAI · 06 MENIT' },
  'home.latest.title': { en:'Learn to code without letting AI do the thinking.', id:'Belajar coding tanpa biarkan AI yang berpikir.' },
  'home.latest.desc':  { en:'A few thoughts on keeping your curiosity sharp when the answers arrive instantly.', id:'Beberapa pemikiran tentang menjaga rasa ingin tahu tetap tajam ketika jawaban datang instan.' },
  'home.latest.read':  { en:'READ THE NOTE →',  id:'BACA CATATAN →' },
  'home.where.label':  { en:'02 / WHERE I AM',  id:'02 / DI MANA SAYA' },
  'home.where.sub':    { en:'based in indonesia, building on the web', id:'berbasis di indonesia, membangun di web' },
  'home.about.tag':    { en:'ABOUT · 01', id:'TENTANG · 01' },
  'home.about.title':  { en:"Hi, I'm Arlingga", id:'Hai, saya Arlingga' },
  'home.about.desc':   { en:'Web dev, frontend + backend, devops, AI engineering. Follow the journey.', id:'Web dev, frontend + backend, devops, AI engineering. Ikuti perjalanannya.' },
  'home.skills.tag':   { en:'SKILLS · 02', id:'KEMAMPUAN · 02' },
  'home.skills.title': { en:'The toolbox', id:'Toolbox' },
  'home.skills.desc':  { en:'JS, Python, Java, Tailwind, NextJS, Firebase, Supabase & more.', id:'JS, Python, Java, Tailwind, NextJS, Firebase, Supabase & lainnya.' },
  'home.stats.tag':    { en:'STATS · 03', id:'STATISTIK · 03' },
  'home.stats.title':  { en:'Shipping in public', id:'Kirim di publik' },
  'home.stats.desc':   { en:'Live GitHub metrics, streaks, and the little automation behind them.', id:'Metrik GitHub live, streaks, dan sedikit otomasi di baliknya.' },
  'home.now.label':    { en:'03 / RIGHT NOW', id:'03 / SEKARANG' },
  'home.now.h2':       { en:'A few things<br>I\'m <em>into.</em>', id:'Beberapa hal<br>yang saya <em>sukai.</em>' },
  'home.now.1':        { en:'Working on a school project — <em>nufabase</em> — one careful feature at a time.', id:'Mengerjakan proyek sekolah — <em>nufabase</em> — satu fitur hati-hati dalam waktu.' },
  'home.now.2':        { en:'Studying JavaScript, CSS & HTML the slow, hands-on way.', id:'Belajar JavaScript, CSS & HTML dengan cara lambat, langsung praktik.' },
  'home.now.3':        { en:'Trying to make the web feel more personal again.', id:'Mencoba membuat web terasa lebih personal kembali.' },
  'home.now.4':        { en:"Ask me about blue — it's my favorite color.", id:'Tanya saya tentang biru — itu warna favorit saya.' },

  /* about */
  'about.eyebrow':    { en:'01 / About me', id:'01 / Tentang saya' },
  'about.h1':         { en:"Hi, I'm<br><em>Arlingga.</em>", id:'Hai, saya<br><em>Arlingga.</em>' },
  'about.intro':      { en:'Web development across the whole stack — frontend, backend, devops, and AI engineering. Vibes of a maker, instincts of a human.', id:'Web development lintas stack — frontend, backend, devops, dan AI engineering. Vibra seorang maker, insting manusia.' },
  'about.lead':       { en:'I build for the web and learn <em>in public.</em>', id:'Saya membangun untuk web dan belajar <em>di publik.</em>' },
  'about.p1':         { en:"I'm a developer based in Indonesia 🇮🇩, working across frontend, backend, devops and AI engineering. Right now I'm putting most of my energy into a school project called <em>nufabase</em>, and studying JavaScript, CSS and HTML the slow, hands-on way — because that's how ideas stick.", id:'Saya pengembang yang berbasis di Indonesia 🇮🇩, bekerja di frontend, backend, devops, dan AI engineering. Sekarang saya menaruh sebagian besar energi ke proyek sekolah bernama <em>nufabase</em>, dan belajar JavaScript, CSS, dan HTML dengan cara lambat, langsung praktik — karena itulah cara ide menempel.' },
  'about.p2':         { en:"I believe in shipping small, keeping things simple, and making the web feel personal again. Also — blue is my favorite color, in case you need conversation fuel.", id:'Saya percaya mengirim yang kecil, menjaga kesederhanaan, dan membuat web terasa personal kembali. Selain itu — biru adalah warna favorit saya, jika butuh bahan ngobrol.' },
  'about.fact.loc':   { en:'location', id:'lokasi' },
  'about.fact.locv':  { en:'Indonesia 🇮🇩', id:'Indonesia 🇮🇩' },
  'about.fact.stat':  { en:'status', id:'status' },
  'about.fact.statv': { en:'learning JS, CSS & HTML', id:'belajar JS, CSS & HTML' },
  'about.fact.work':  { en:'working on', id:'mengerjakan' },
  'about.fact.workv': { en:'nufabase (school project)', id:'nufabase (proyek sekolah)' },
  'about.fact.open':  { en:'open to', id:'terbuka untuk' },
  'about.fact.openv': { en:'modern website collabs', id:'kolaborasi website modern' },
  'about.fact.col':   { en:'favorite color', id:'warna favorit' },
  'about.fact.colv':  { en:'blue 💙', id:'biru 💙' },
  'about.fact.em':    { en:'email', id:'email' },
  'about.fact.emv':   { en:'linggasaja03@gmail.com', id:'linggasaja03@gmail.com' },
  'about.now.label':  { en:'Now', id:'Sekarang' },
  'about.now.h2':     { en:'Currently<br><em>doing.</em>', id:'Saat ini<br><em>mengerjakan.</em>' },
  'about.now.1':      { en:'Building little web experiments with vanilla JavaScript.', id:'Membangun eksperimen web kecil dengan vanilla JavaScript.' },
  'about.now.2':      { en:'Keeping a school project (nufabase) alive, one careful feature at a time.', id:'Menjaga proyek sekolah (nufabase) tetap hidup, satu fitur hati-hati dalam waktu.' },
  'about.now.3':      { en:'Learning the fundamentals before reaching for frameworks.', id:'Belajar dasar-dasar sebelum meraih frameworks.' },
  'about.now.4':      { en:'Looking to collaborate on modern website production.', id:'Mencari kolaborasi untuk produksi website modern.' },

  /* skills */
  'skills.eyebrow':  { en:'02 / Skills', id:'02 / Kemampuan' },
  'skills.h1':       { en:'The <em>toolbox.</em>', id:'<em>Toolbox</em> saya.' },
  'skills.intro':    { en:'A growing collection of languages, frameworks and tools I reach for — and keep getting better at.', id:'Koleksi yang terus bertambah dari bahasa, framework, dan tool yang saya gunakan — dan terus berkembang.' },
  'skills.lang.lbl': { en:'Languages', id:'Bahasa' },
  'skills.lang.sub': { en:'the core', id:'inti' },
  'skills.js.title': { en:'JavaScript', id:'JavaScript' },
  'skills.js.desc':  { en:'Scripting, DOM, ES modules.', id:'Scripting, DOM, ES modules.' },
  'skills.py.title': { en:'Python', id:'Python' },
  'skills.py.desc':  { en:'Logic, automation, tooling.', id:'Logika, otomasi, tooling.' },
  'skills.jv.title': { en:'Java', id:'Java' },
  'skills.jv.desc':  { en:'Object-oriented fundamentals.', id:'Dasar object-oriented.' },
  'skills.html.title': { en:'HTML5', id:'HTML5' },
  'skills.html.desc':  { en:'Semantic, accessible markup.', id:'Markup semantik dan aksesibel.' },
  'skills.fe.lbl':   { en:'Frontend', id:'Frontend' },
  'skills.fe.sub':   { en:'looks & feel', id:'tampilan & rasa' },
  'skills.tw.title': { en:'TailwindCSS', id:'TailwindCSS' },
  'skills.tw.desc':  { en:'Utility-first styling.', id:'Styling utility-first.' },
  'skills.nx.title': { en:'NextJS', id:'NextJS' },
  'skills.nx.desc':  { en:'React-based web apps.', id:'Web app berbasis React.' },
  'skills.css.title': { en:'CSS', id:'CSS' },
  'skills.css.desc':  { en:'Layout, animation, design.', id:'Layout, animasi, desain.' },
  'skills.vsc.title': { en:'VS Code', id:'VS Code' },
  'skills.vsc.desc':  { en:'My daily driver editor.', id:'Editor harian saya.' },
  'skills.bp.lbl':   { en:'Backend & Platform', id:'Backend & Platform' },
  'skills.bp.sub':   { en:'ship & run', id:'kirim & jalankan' },
  'skills.fb.title': { en:'Firebase', id:'Firebase' },
  'skills.fb.desc':  { en:'Hosting, auth, realtime data.', id:'Hosting, auth, data realtime.' },
  'skills.sb.title': { en:'Supabase', id:'Supabase' },
  'skills.sb.desc':  { en:'Postgres as a service.', id:'Postgres sebagai layanan.' },
  'skills.git.title': { en:'Git', id:'Git' },
  'skills.git.desc':  { en:'Version control & workflows.', id:'Kontrol versi & workflow.' },
  'skills.dc.title': { en:'DevOps', id:'DevOps' },
  'skills.dc.desc':  { en:'Deployment, CI/CD, infra.', id:'Deployment, CI/CD, infra.' },

  /* projects */
  'proj.eyebrow':    { en:'03 / Projects', id:'03 / Proyek' },
  'proj.h1':         { en:'Built, <em>shipping.</em>', id:'Dibuat, <em>siap kirim.</em>' },
  'proj.intro':      { en:"Things I've made while learning in public — from school projects to small experiments that keep the curiosity sharp.", id:'Hal-hal yang saya buat sambil belajar di publik — dari proyek sekolah hingga eksperimen kecil yang menjaga rasa ingin tahu tetap tajam.' },
  'proj.feat.label': { en:'Featured', id:'Unggulan' },
  'proj.feat.sub':   { en:'currently the main quest', id:'saat ini misi utama' },
  'proj.feat.tag':   { en:'SCHOOL PROJECT · LIVE', id:'PROYEK SEKOLAH · LIVE' },
  'proj.feat.desc':  { en:"A web project I'm building and maintaining one careful feature at a time — from data to layout to deployment.", id:'Proyek web yang saya bangun dan jaga satu fitur hati-hati dalam waktu — dari data hingga layout hingga deployment.' },
  'proj.feat.link':  { en:'VISIT SITE →', id:'KUNJUNGI SITUS →' },
  'proj.arch.label': { en:'From the archive', id:'Dari arsip' },
  'proj.arch.sub':   { en:'small observations, small builds', id:'observasi kecil, build kecil' },
  'proj.a1.title':   { en:'This portfolio — arlingkin', id:'Portofolio ini — arlingkin' },
  'proj.a1.desc':    { en:'A quiet corner of the internet built with care & plain HTML. Multi-page, clean URLs, dark notebook aesthetic.', id:'Sudut tenang internet yang dibangun dengan teliti & HTML murni. Multi-halaman, URL bersih, estetika buku catatan gelap.' },
  'proj.a2.title':   { en:'School project — nufabase', id:'Proyek sekolah — nufabase' },
  'proj.a2.desc':    { en:'The main quest. Building the small version first and letting it grow feature by feature.', id:'Misi utama. Membangun versi kecilnya dulu dan membiarkannya tumbuh fitur per fitur.' },
  'proj.a3.title':   { en:'Web experiments', id:'Eksperimen web' },
  'proj.a3.desc':    { en:'Little vanilla JavaScript builds, streak automations, and GitHub metrics — the sandbox where I play.', id:'Build JavaScript vanilla kecil, otomasi streaks, dan metrik GitHub — tempat bermain saya.' },
  'proj.a4.title':   { en:'About repo (this site)', id:'Repo about (situs ini)' },
  'proj.a4.desc':    { en:'Open source, MIT licensed. Learn to code without letting AI do the thinking.', id:'Open source, berlisensi MIT. Belajar coding tanpa biarkan AI yang berpikir.' },
  'proj.a4.link':    { en:'SOURCE ↗', id:'SUMBER ↗' },

  /* stats */
  'stats.eyebrow':    { en:'04 / GitHub stats', id:'04 / Statistik GitHub' },
  'stats.h1':         { en:'Shipping <em>in public.</em>', id:'Kirim <em>di publik.</em>' },
  'stats.intro':      { en:'Live metrics rendered fresh on every push — this page is generated by the same automation that powers the repo README.', id:'Metrik live yang dirender segar setiap push — halaman ini dihasilkan oleh otomasi yang sama yang menyalakan README repo.' },
  'stats.live.lbl':   { en:'Live metrics', id:'Metrik live' },
  'stats.live.sub':   { en:'auto-updated by github actions', id:'diperbarui otomatis oleh github actions' },
  'stats.streak.lbl': { en:'Current streak', id:'Streak saat ini' },
  'stats.streak.sub': { en:'updated daily', id:'diperbarui setiap hari' },
  'stats.auto1.desc': { en:'A scheduled GitHub Action that compiles my activity into <span class="kbd">github-metrics.svg</span> on every commit.', id:'GitHub Action terjadwal yang mengkompilasi aktivitas saya menjadi <span class="kbd">github-metrics.svg</span> setiap commit.' },
  'stats.auto2.desc': { en:'A live streak card — maintenance means momentum. Badge data comes from the streak API on each run.', id:'Kartu streak live — pemeliharaan berarti momentum. Data badge berasal dari streak API setiap kali dijalankan.' },
  'stats.auto3.desc': { en:'A small Python script in the repo that keeps the streak automation fed and fresh.', id:'Skrip Python kecil di repo yang menjaga otomasi streak tetap aktif dan segar.' },

  /* contact */
  'contact.eyebrow':    { en:'05 / Contact', id:'05 / Kontak' },
  'contact.h1':         { en:'Say <em>hello.</em>', id:'Katakan <em>halo.</em>' },
  'contact.intro':      { en:'Open to collaboration on modern website production, questions about code, or just a chat — especially about blue. 💙', id:'Terbuka untuk kolaborasi produksi website modern, pertanyaan tentang kode, atau sekadar ngobrol — terutama tentang biru. 💙' },
  'contact.email.desc': { en:'For work, projects, or collaboration. I usually reply within a couple of days.', id:'Untuk kerja, proyek, atau kolaborasi. Biasanya saya balas dalam beberapa hari.' },
  'contact.email.btn':  { en:'copy email', id:'salin email' },
  'contact.gh.desc':    { en:'Code, experiments, and everything I ship in public.', id:'Kode, eksperimen, dan semua yang saya kirim di publik.' },
  'contact.ig.desc':    { en:'Life behind the code and occasional project peeks.', id:'Kehidupan di balik kode dan sekilas proyek sesekali.' },
  'contact.tt.desc':    { en:'Short clips, build stories, and the occasional hot take.', id:'Klip pendek, cerita build, dan opini sesekali.' },
  'contact.yt.desc':    { en:'Longer form: tutorials, walkthroughs, and learning in public.', id:'Format panjang: tutorial, walkthrough, dan belajar di publik.' },
  'contact.tg.desc':    { en:'Quick messages, direct and casual.', id:'Pesan singkat, langsung dan santai.' },
  'contact.coffee.desc':{ en:'If anything here helped or inspired you, a coffee keeps the experiments going.', id:'Jika sesuatu di sini membantu atau menginspirasi, secangkir kopi menjaga eksperimen tetap berjalan.' },
};

/* ── language ─────────────────────────────────────────────────── */
function getLang() { return localStorage.getItem(LANG_KEY) || 'en'; }

function applyLang(lang) {
  document.documentElement.setAttribute('data-lang', lang);
  localStorage.setItem(LANG_KEY, lang);
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const entry = T[key];
    if (!entry) return;
    el.innerHTML = entry[lang] || entry.en;
  });
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('on', btn.dataset.lang === lang);
  });
  /* update <html lang> */
  document.documentElement.lang = lang === 'id' ? 'id' : 'en';
}

function initLangSwitch() {
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => applyLang(btn.dataset.lang));
  });
}

/* ── nav ──────────────────────────────────────────────────────── */
function setActiveNav() {
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href') || '';
    if (href.startsWith('http')) return;
    const target = href.split('#')[0].replace(/\.html$/, '');
    const here = path === '/' ? '/index' : path;
    if (here === target) link.classList.add('active');
  });
}

/* ── reveal ───────────────────────────────────────────────────── */
function revealOnScroll() {
  const els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) { els.forEach(e => e.classList.add('in')); return; }
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  els.forEach(el => io.observe(el));
}

/* ── copy email ───────────────────────────────────────────────── */
function initCopyEmail() {
  document.querySelectorAll('[data-copy]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const val = btn.getAttribute('data-copy');
      try { await navigator.clipboard.writeText(val); } catch {
        const t = document.createElement('textarea');
        t.value = val; document.body.appendChild(t); t.select();
        document.execCommand('copy'); t.remove();
      }
      const orig = btn.textContent;
      btn.textContent = 'copied ✓';
      setTimeout(() => { btn.textContent = orig; }, 1600);
    });
  });
}

/* ── boot ─────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  setActiveNav();
  revealOnScroll();
  initCopyEmail();
  initLangSwitch();
  applyLang(getLang());
}, { once: true });