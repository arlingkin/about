const LANG_KEY = 'arlingkin-lang';
const path = location.pathname.replace(/\/$/, '') || '/';

const T = {
  'nav.home':     { en:'home',      id:'beranda' },
  'nav.about':    { en:'about',     id:'tentang' },
  'nav.skills':   { en:'skills',    id:'kemampuan' },
  'nav.projects': { en:'projects',  id:'proyek' },
  'nav.notes':    { en:'notes',     id:'catatan' },
  'nav.stats':    { en:'stats',     id:'statistik' },
  'nav.contact':  { en:'contact',   id:'kontak' },
  'nav.github':   { en:'github ↗',  id:'github ↗' },
  'footer.copy': { en: "© 2026 Arlingkin. Plain HTML, CSS and a bit of JS.", id: "© 2026 Arlingkin. HTML, CSS, dan sedikit JS." },
  'footer.hello': { en:'say hello ↗', id:'sapa saya ↗' },
  'footer.tagline': { en: "Arlingga. I build web stuff and write down what I learn.", id: "Arlingga. Bikin web dan mencatat apa yang lagi dipelajari." },
  'footer.status': { en: "open to collaborate", id: "terbuka untuk kolaborasi" },
  'footer.nav': { en: "Pages", id: "Halaman" },
  'footer.social': { en: "Find me on", id: "Temui saya di" },
  'footer.contact': { en:'Contact', id:'Kontak' },
  'footer.top': { en: "Back to top ↑", id: "Ke atas ↑" },
  'skip.main':    { en:'Skip to content', id:'Lewati ke konten' },

  'err.eyebrow': { en: "404 - Not found", id: "404 - Tidak ketemu" },
  'err.home': { en: "BACK HOME →", id: "KE BERANDA →" },

  'home.eyebrow':      { en:'Personal notes - 2026',   id:'Catatan pribadi - 2026' },
  'home.h1':           { en:'Making sense of <em>code.</em>',  id:'Menerka makna <em>kode.</em>' },
  'home.intro': { en: "This is my personal site. I make things for the web and keep notes on what I'm <strong>learning.</strong>", id: "Ini situs pribadi saya. Saya bikin hal-hal untuk web dan mencatat apa yang lagi <strong>saya pelajari.</strong>" },
  'home.status':       { en:'vibe code, but with <em>human</em> sense', id:'vibe code, tapi tetap pakai akal <em>manusia</em>' },
  'home.latest.label': { en:'<span class="sec-num">01</span>LATEST NOTE', id:'<span class="sec-num">01</span>CATATAN TERBARU' },
  'home.latest.link': { en:"all notes", id:"semua catatan" },
  'home.latest.tag':   { en:'PERSONAL NOTE',  id:'CATATAN PRIBADI' },
  'home.latest.title': { en:"Where it started: Mindustry logic.", id:"Awalnya dari logic Mindustry." },
  'home.latest.desc': { en:"How a phone game and its logic processor led me into web development.", id:"Bagaimana game di ponsel dan logic processor-nya membawa saya ke web development." },
  'home.latest.read':  { en:'READ THE NOTE →',  id:'BACA CATATAN →' },
  'trading.h1':    { en:'The moment I stopped <em>watching the chart.</em>', id:'Saat saya berhenti <em>menatap chart.</em>' },
  'trading.lead': { en:"There was a point where checking the chart felt like doing the work. It wasn't.", id:'Pernah ada titik ketika mengecek chart terasa seperti sedang bekerja. Padahal tidak.' },
  'trading.p1': { en: "I used to think more screen time meant more chances. More candles, more setups, more moves to catch. Most of the time I was just staring at every tiny movement.", id: "Dulu saya kira makin lama di depan layar berarti makin banyak peluang. Lebih banyak candle, setup, dan pergerakan yang bisa ditangkap. Nyatanya, saya lebih sering cuma menatapi setiap gerakan kecil." },
  'trading.p2': { en:"A setup doesn't become better because I stare at it longer. A loss doesn't become easier because I immediately hunt for the next trade. And a green candle isn't an invitation.", id:'Sebuah setup tidak menjadi lebih bagus hanya karena saya menatapnya lebih lama. Kerugian tidak menjadi lebih ringan hanya karena saya langsung mencari trade berikutnya. Dan candle hijau bukan berarti sebuah undangan.' },
  'trading.quote': { en:'Sometimes the most disciplined thing I can do is <span>close the chart.</span>', id:'Kadang hal paling disiplin yang bisa saya lakukan adalah <span>menutup chart.</span>' },
  'trading.p3': { en: "That changed how I want to trade. I still study structure, liquidity, entries and risk, but I want the plan to work even when the screen is off. I don't need to predict every move. I need to know my setup, decide where it's wrong, risk only what I can accept, and walk away.", id: "Itu mengubah cara saya ingin trading. Saya tetap belajar structure, liquidity, entry, dan risk, tapi saya mau rencananya tetap jalan meski layar mati. Saya tidak perlu memprediksi semua gerakan. Saya cuma perlu paham setup saya, tahu di mana setup itu salah, mengambil risiko yang bisa saya terima, lalu pergi." },
  'trading.p4': { en: "For me, stepping away isn't wasted time, it's part of the system. I have school, prayer, family, exercise and coding, and a life outside the candles. If a plan needs me to watch every second, it's not really freedom.", id: "Buat saya, menjauh sejenak bukan waktu yang terbuang, itu bagian dari sistem. Saya punya sekolah, ibadah, keluarga, olahraga, dan coding, juga hidup di luar candle. Kalau sebuah plan mengharuskan saya menonton setiap detik, itu belum benar-benar bebas." },
  'trading.p5': { en: "I'm still learning this. Some days I break my own rule and go back to the screen too fast. The difference is that I notice now, and I can reset before one bad decision ruins the whole session.", id: "Saya masih belajar soal ini. Beberapa hari saya masih melanggar aturan sendiri dan kembali ke layar terlalu cepat. Bedanya sekarang saya sadar, dan bisa reset sebelum satu keputusan buruk merusak satu sesi penuh." },
  'sr2.h1': { en: "How I became an <em>engineer in Simple Rockets 2.</em>", id: "Bagaimana saya jadi <em>engineer di Simple Rockets 2.</em>" },
  'sr2.lead': { en: "<a class=\"inline-link\" href=\"https://www.simplerockets.com/\" target=\"_blank\" rel=\"noreferrer\">Simple Rockets 2</a> is where code first started to make sense to me: not as syntax, but as cause and effect.", id: "<a class=\"inline-link\" href=\"https://www.simplerockets.com/\" target=\"_blank\" rel=\"noreferrer\">Simple Rockets 2</a> adalah tempat kode pertama kali masuk akal buat saya: bukan sebagai sintaks, tapi sebagai sebab dan akibat." },
  'sr2.p1': { en: "Every rocket starts as a question: why does it wobble, why does it stall? I redesign, fly, read what went wrong, and fix it. That loop of build, test and debug is the same one I use when I write code. One of my best builds is a rocket with good aerodynamics: a clean shape that cuts through the air instead of fighting it.", id: "Setiap roket berawal dari pertanyaan: kenapa oleng, kenapa stall? Saya rancang ulang, terbangkan, baca apa yang salah, lalu perbaiki. Putaran bangun, uji, dan debug itu sama persis dengan yang saya pakai saat menulis kode. Salah satu karya terbaik saya adalah roket beraerodinamika bagus: bentuknya ramping, membelah udara alih-alih melawannya." },
  'sr2.p2': { en: "Then I built a huge space station with many docking ports and filled it with astronauts. Docking only works when both sides share the same shape, and that is how I understood interfaces: a contract between two parts that never see each other's insides. Many docks also means many ships can visit at once.", id: "Lalu saya membangun stasiun luar angkasa raksasa dengan banyak dock dan mengisinya dengan astronaut. Dock hanya bekerja kalau kedua sisi punya bentuk yang sama. Dari situ saya paham apa itu interface: kontrak antara dua bagian yang tidak pernah melihat isi dalam satu sama lain. Banyak dock juga berarti banyak pesawat bisa datang bersamaan." },
  'sr2.p3': { en: "My favorite part is programming the embedded chip inside the game, and it is so much fun. My programs run on their own: staging is a sequence, pitch is a feedback loop that reads the angle and corrects it, and deploying the payload is a condition that fires at the right moment. Watching a rocket obey what I wrote made sequence, loop and condition feel real instead of abstract.", id: "Bagian favorit saya adalah memprogram chip embedded di dalam game, dan itu seru banget. Program saya berjalan sendiri: staging adalah urutan langkah, pitch adalah feedback loop yang membaca sudut lalu mengoreksinya, dan deploy muatan adalah kondisi yang menyala di saat yang tepat. Melihat roket menurut pada apa yang saya tulis membuat urutan, loop, dan kondisi terasa nyata, bukan sekadar teori." },
  'sr2.quote': { en: "Code stopped being abstract when it <span>flew a rocket.</span>", id: "Kode berhenti jadi abstrak saat ia <span>menerbangkan roket.</span>" },
  'sr2.p4': { en: "I also made one of the fastest planes in the game. I strapped a rocket on it, used the tinker panel to keep the weight light, and wrote a small program so the rocket pushes the plane with unlimited fuel. Every gram counts, so I learned to think in constraints: what to keep, what to cut, what to automate.", id: "Saya juga membuat salah satu pesawat tercepat di game. Saya pasang roket di atasnya, memakai tinker panel supaya bobotnya ringan, dan menulis program kecil agar roket mendorong pesawat dengan bahan bakar tak terbatas. Setiap gram berarti, jadi saya belajar berpikir dalam batasan: apa yang dipertahankan, apa yang dibuang, apa yang diotomatisasi." },
  'sr2.p5': { en: "I built a VTOL rocket too. It rises and lands on its own thrust, so it needs small corrections again and again, which is exactly what a loop does in code.", id: "Saya juga membuat roket VTOL. Ia naik dan mendarat dengan dorongannya sendiri, jadi butuh koreksi kecil berulang-ulang, persis seperti yang dilakukan sebuah loop di dalam kode." },
  'sr2.toc': { en: "In this note", id: "Di catatan ini" },
  'sr2.s1': { en: "The aerodynamic rocket", id: "Roket aerodinamis" },
  'sr2.s2': { en: "The space station", id: "Stasiun luar angkasa" },
  'sr2.s3': { en: "Programs that fly themselves", id: "Program yang terbang sendiri" },
  'sr2.s4': { en: "One of the fastest planes", id: "Salah satu pesawat tercepat" },
  'sr2.s5': { en: "VTOL rocket", id: "Roket VTOL" },
  'sr2.about_tag': { en: "ABOUT THE GAME", id: "TENTANG GAME" },
  'sr2.about_desc': { en: "A spaceflight sandbox: design rockets, planes and stations part by part, program them, then fly them.", id: "Sandbox penerbangan luar angkasa: rancang roket, pesawat, dan stasiun bagian demi bagian, program, lalu terbangkan." },
  'sr2.about_cta': { en: "VISIT SIMPLEROCKETS.COM ↗", id: "KUNJUNGI SIMPLEROCKETS.COM ↗" },
  'sr2.about_src': { en: "Game by Jundroo · <a class=\"inline-link\" href=\"https://www.simplerockets.com/\" target=\"_blank\" rel=\"noreferrer\">simplerockets.com</a>. Illustrations here are my own, drawn as inline SVG.", id: "Game oleh Jundroo · <a class=\"inline-link\" href=\"https://www.simplerockets.com/\" target=\"_blank\" rel=\"noreferrer\">simplerockets.com</a>. Ilustrasi di sini saya gambar sendiri sebagai SVG." },
  'sr2.cap0': { en: "From the launch pad to orbit, all inside the game.", id: "Dari landasan peluncuran sampai orbit, semuanya di dalam game." },
  'sr2.cap1': { en: "A clean nose and fins keep drag low, so the thrust goes into climbing.", id: "Hidung ramping dan sirip menjaga hambatan tetap kecil, jadi dorongan terpakai untuk naik." },
  'sr2.cap2': { en: "Many docks on one station: ships can arrive while the crew works.", id: "Banyak dock di satu stasiun: pesawat bisa datang saat kru bekerja." },
  'sr2.cap3': { en: "The chip flies the mission on its own: a sequence, a loop, a condition.", id: "Chip menerbangkan misi sendiri: urutan, loop, dan kondisi." },
  'sr2.cap4': { en: "Light plane, strapped-on rocket, small program feeding it. Sketch, not to scale.", id: "Pesawat ringan, roket terpasang, dan program kecil yang mengaturnya. Sketsa, tidak sesuai skala." },
  'sr2.cap5': { en: "VTOL: up on thrust, down on thrust. Sketch, not to scale.", id: "VTOL: naik dengan dorongan, turun dengan dorongan. Sketsa, tidak sesuai skala." },
  'sr2.end': { en: "The game never told me this was programming. It just kept asking me to think clearly, test honestly and fix patiently, and that is the habit I carry into every line of code. Want to try? Start at <a class=\"inline-link\" href=\"https://www.simplerockets.com/\" target=\"_blank\" rel=\"noreferrer\">simplerockets.com</a>.", id: "Game ini tidak pernah bilang bahwa ini pemrograman. Ia hanya terus meminta saya berpikir jernih, menguji dengan jujur, dan memperbaiki dengan sabar, kebiasaan yang saya bawa ke setiap baris kode. Mau mencoba? Mulai dari <a class=\"inline-link\" href=\"https://www.simplerockets.com/\" target=\"_blank\" rel=\"noreferrer\">simplerockets.com</a>." },
  'sr2.s6': { en: "From game to code", id: "Dari game ke kode" },
  'sr2.p6': { en: "Looking back, the game was a gentle way into programming. Every idea I met while playing has a twin in code:", id: "Kalau dilihat lagi, game ini adalah pintu masuk yang lembut ke pemrograman. Setiap ide yang saya temui saat bermain punya kembarannya di dalam kode:" },
  'sr2.m1g': { en: "Staging", id: "Staging" },
  'sr2.m1c': { en: "Sequence", id: "Urutan" },
  'sr2.m2g': { en: "Pitch", id: "Pitch" },
  'sr2.m2c': { en: "Feedback loop", id: "Feedback loop" },
  'sr2.m3g': { en: "Deploy", id: "Deploy" },
  'sr2.m3c': { en: "Condition", id: "Kondisi" },
  'sr2.m4g': { en: "Docks", id: "Dock" },
  'sr2.m4c': { en: "Interface", id: "Interface" },
  'sr2.m5g': { en: "Weight", id: "Bobot" },
  'sr2.m5c': { en: "Constraint", id: "Batasan" },
  'sr2.m6g': { en: "Test flight", id: "Uji terbang" },
  'sr2.m6c': { en: "Debugging", id: "Debugging" },
  'notes.eyebrow': { en:"Notes", id:"Catatan" },
  'notes.h1': { en:"Short <em>notes.</em>", id:"Catatan <em>singkat.</em>" },
  'notes.intro': { en:"Things I write down while learning. No fixed schedule.", id:"Yang saya tulis sambil belajar. Tanpa jadwal tetap." },
  'notes.main.label': { en:"Main note", id:"Catatan utama" },
  'notes.main.sub': { en:"start here", id:"mulai dari sini" },
  'notes.more.label': { en:"More notes", id:"Catatan lain" },
  'notes.more.sub': { en:"smaller ones", id:"yang lebih kecil" },
  'notes.read': { en:"READ NOTE →", id:"BACA CATATAN →" },
  'note3.h1': { en:"Where it started: <em>Mindustry logic.</em>", id:"Awalnya dari <em>logic Mindustry.</em>" },
  'note3.lead': { en:"I started programming inside a game, on my phone.", id:"Saya mulai memprogram dari sebuah game, lewat ponsel." },
  'note3.p1': { en:"<a class=\"inline-link\" href=\"https://mindustrygame.github.io/\" target=\"_blank\" rel=\"noreferrer\"><img class=\"inline-ico\" src=\"/icons/tools/mindustry.png\" alt=\"\" width=\"18\" height=\"18\">Mindustry</a> has a logic processor you program in a language called mlog. I learned it on my phone, bit by bit, because I simply like to program. That is where my skills kept sharpening.", id:"<a class=\"inline-link\" href=\"https://mindustrygame.github.io/\" target=\"_blank\" rel=\"noreferrer\"><img class=\"inline-ico\" src=\"/icons/tools/mindustry.png\" alt=\"\" width=\"18\" height=\"18\">Mindustry</a> punya logic processor yang diprogram dengan bahasa mlog. Saya mempelajarinya di ponsel, sedikit demi sedikit, karena saya memang suka memprogram. Dari situ kemampuan saya terus terasah." },
  'note3.p2': { en:"Then I moved on to Mindustry mods written in JavaScript. From there the road opened into web development, Java and semantic HTML.", id:"Lalu saya masuk ke mod Mindustry yang ditulis dengan JavaScript. Dari sana jalannya terbuka ke web development, Java, dan HTML semantik." },
  'note3.p3': { en:"One of my creations is a schematic that monitors launch pad items. Its display draws a realtime graph of the item flow. It comes from my save data of playing Mindustry v6 in 2025.", id:"Salah satu karya saya adalah skematik untuk memantau item di launch pad. Display-nya menggambar grafik aliran item secara realtime. Skematik itu ada di data save saya saat bermain Mindustry v6 pada 2025." },
  'note3.p4': { en:"The save data is ready to import into your Mindustry. Give it a try.", id:"Data save-nya siap diimpor ke Mindustry Anda. Silakan dicoba." },
  'note3.p5': { en:"I also played well. I finished the campaign without mods and took every sector at 15.", id:"Saya juga bermain dengan lihai: kampanye tamat tanpa mod, dan seluruh sektor saya kuasai di usia 15 tahun." },
  'note3.link': { en:"Get my save data ↗", id:"Ambil data save saya ↗" },
  'note3.back': { en:"← back to notes", id:"← kembali ke catatan" },
  'home.where.label':  { en:'<span class="sec-num">02</span>WHERE I AM', id:'<span class="sec-num">02</span>DI MANA SAYA' },
  'home.where.sub': { en: "based in indonesia", id: "tinggal di indonesia" },
  'home.about.tag':    { en:'<span class="idx">02.1</span>ABOUT', id:'<span class="idx">02.1</span>TENTANG' },
  'home.about.title':  { en:"Hi, I'm Arlingga", id:'Hai, saya Arlingga' },
  'home.about.desc': { en: "Web dev: frontend, backend, a bit of devops and AI.", id: "Web dev: frontend, backend, sedikit devops dan AI." },
  'home.skills.tag':   { en:'<span class="idx">02.3</span>SKILLS', id:'<span class="idx">02.3</span>KEAHLIAN' },
  'home.skills.title': { en:'The toolbox', id:'Kotak perkakas' },
  'home.skills.desc': { en: "JS, Python, Java, Tailwind, NextJS, Firebase, Supabase and more.", id: "JS, Python, Java, Tailwind, NextJS, Firebase, Supabase, dan lainnya." },
  'home.stats.tag':    { en:'<span class="idx">02.4</span>STATS', id:'<span class="idx">02.4</span>STATISTIK' },
  'home.stats.title': { en: "GitHub stats", id: "Statistik GitHub" },
  'home.stats.desc': { en: "My GitHub activity and streak, updated automatically.", id: "Aktivitas GitHub dan streak saya, diperbarui otomatis." },
  'home.proj.tag':     { en:'<span class="idx">02.2</span>PROJECTS', id:'<span class="idx">02.2</span>PROYEK' },
  'home.proj.title':   { en: "Things I built", id: "Yang sudah saya buat" },
  'home.proj.desc': { en: "A school web app, a Matrix-style snake game, an Android data-quota tracker and a few web experiments.", id: "Web app sekolah, game snake bertema Matrix, aplikasi Android pemantau kuota, dan beberapa eksperimen web." },
  'home.now.label':    { en:'<span class="sec-num">03</span>RIGHT NOW', id:'<span class="sec-num">03</span>SEKARANG' },
  'home.now.h2': { en: "What I'm<br><em>up to.</em>", id: "Lagi<br><em>ngapain.</em>" },
  'home.now.1': { en: "Working on a personal project, one feature at a time.", id: "Ngerjain proyek pribadi, satu fitur setiap kali." },
  'home.now.2': { en: "Learning JavaScript, CSS and HTML by building stuff.", id: "Belajar JavaScript, CSS, dan HTML sambil langsung bikin sesuatu." },
  'home.now.3': { en: "Still tweaking this site.", id: "Masih utak-atik situs ini." },
  'home.now.4': { en: "Writing short notes about what I learn.", id: "Menulis catatan singkat soal apa yang saya pelajari." },
  'home.toolbox.label': { en:'<span class="sec-num">04</span>TOOLBOX', id:'<span class="sec-num">04</span>KOTAK PERKAKAS' },
  'home.toolbox.sub': { en: "things I build with", id: "alat yang saya pakai" },

  'about.eyebrow':    { en:'01 - About me', id:'01 - Tentang saya' },
  'about.h1':         { en:"Hi, I'm<br><em>Arlingga.</em>", id:'Hai, saya<br><em>Arlingga.</em>' },
  'about.intro': { en: "Web developer from Indonesia. I started out playing games and ended up writing code.", id: "Web developer dari Indonesia. Awalnya main game, ujung-ujungnya malah belajar ngoding." },
  'about.lead': { en: "I started with games and ended up <em>building for the web.</em>", id: "Awalnya main game, ujungnya <em>membangun untuk web.</em>" },
  'about.p1': { en: "My name is Arlingga Ainul Yakin, or Arlingkin online: Arling + kin. I'm a developer from Indonesia 🇮🇩 who loves playing games, and that is what pulled me into coding (<a href=\"/notes/mindustry\">the story</a> is in my <a href=\"/notes\">notes</a>). Now I work on frontend, backend, devops and a bit of AI.", id: "Nama saya Arlingga Ainul Yakin, atau Arlingkin di internet: Arling + kin. Saya developer dari Indonesia 🇮🇩 yang suka main game, dan dari situlah saya terseret ke dunia koding (<a href=\"/notes/mindustry\">ceritanya</a> ada di <a href=\"/notes\">catatan</a> saya). Sekarang saya mengerjakan frontend, backend, devops, dan sedikit AI." },
  'about.p2': { en: "I learn JavaScript, CSS and HTML by building real things: a school web app, a Matrix-style snake game, an Android data-quota tracker, and now a personal project. I like shipping small things, keeping them simple, and writing down what I learn.", id: "Saya belajar JavaScript, CSS, dan HTML lewat membuat hal nyata: web app sekolah, game snake bertema Matrix, aplikasi Android pemantau kuota, dan sekarang proyek pribadi. Saya suka merilis hal-hal kecil, menjaganya tetap sederhana, dan mencatat apa yang saya pelajari." },
  'about.fact.loc':   { en:'location', id:'lokasi' },
  'about.fact.locv':  { en:'Indonesia 🇮🇩', id:'Indonesia 🇮🇩' },
  'about.fact.stat':  { en:'status', id:'status' },
  'about.fact.statv': { en:'active', id:'aktif' },
  'about.fact.work':  { en:'working on', id:'mengerjakan' },
  'about.fact.workv': { en:'personal project', id:'proyek pribadi' },
  'about.fact.open':  { en:'open to', id:'terbuka untuk' },
  'about.fact.openv': { en:'collaborate', id:'berkolaborasi' },
  'about.fact.alias': { en:'also known as', id:'dikenal juga sebagai' },
  'about.fact.aliasv': { en:'Arlingkin', id:'Arlingkin' },
  'about.fact.em':    { en:'email', id:'email' },
  'about.fact.emv':   { en:window.SITE_MAIL || '', id:window.SITE_MAIL || '' },
  'about.now.label':  { en:'Now', id:'Sekarang' },
  'about.now.h2': { en: "What I'm<br><em>doing now.</em>", id: "Yang lagi<br><em>saya kerjakan.</em>" },
  'about.now.1': { en: "Making small web experiments in vanilla JavaScript.", id: "Bikin eksperimen web kecil pakai JavaScript vanilla." },
  'about.now.2': { en: "Working on a personal project, one feature at a time.", id: "Mengerjakan proyek pribadi, satu fitur setiap kali." },
  'about.now.3': { en: "Learning the basics before jumping into frameworks.", id: "Belajar dasar dulu sebelum lompat ke framework." },
  'about.now.4': { en: "Open to building websites with other people.", id: "Terbuka untuk bikin website bareng orang lain." },

  'skills.eyebrow':  { en:'02 - Skills', id:'02 - Keahlian' },
  'skills.h1':       { en:'The <em>toolbox.</em>', id:'Kotak <em>perkakas</em> saya.' },
  'skills.intro': { en: "The languages, frameworks and tools I use most.", id: "Bahasa, framework, dan tool yang paling sering saya pakai." },

  'proj.eyebrow':    { en:'03 - Projects', id:'03 - Proyek' },
  'proj.h1': { en: "Things I <em>built.</em>", id: "Yang sudah <em>saya buat.</em>" },
  'proj.intro': { en: "Stuff I made while learning, from school projects to small experiments.", id: "Yang saya buat sambil belajar, dari proyek sekolah sampai eksperimen kecil." },
  'proj.feat.label': { en:'Featured', id:'Unggulan' },
  'proj.feat.sub': { en: "what I'm mostly working on", id: "yang paling sering saya kerjakan" },
  'proj.arch.label': { en:'More projects', id:'Proyek lainnya' },
  'proj.arch.sub': { en: "smaller stuff", id: "yang lebih kecil" },
  'proj.soon.title': { en: "The next one is in the works.", id: "Yang berikutnya lagi dikerjakan." },
  'proj.soon.desc': { en: "New projects land here once they're ready to show. One feature at a time.", id: "Proyek baru muncul di sini begitu siap dipamerkan. Satu fitur setiap kali." },
  'proj.soon.alt': { en: "Arlingkin letters hopping with squash and stretch", id: "Huruf arlingkin melompat dengan squash and stretch" },

  'filter.all': { en: "All", id: "Semua" },
  'filter.label': { en: "Search", id: "Cari" },
  'filter.title': { en: "Filter", id: "Filter" },
  'filter.clearq': { en: "Clear search", id: "Hapus pencarian" },
  'filter.ph.notes': { en: "Search notes…", id: "Cari catatan…" },
  'filter.ph.projects': { en: "Search projects…", id: "Cari proyek…" },
  'filter.count.notes': { en: "Showing {n} of {t} notes", id: "Menampilkan {n} dari {t} catatan" },
  'filter.count.projects': { en: "Showing {n} of {t} projects", id: "Menampilkan {n} dari {t} proyek" },
  'filter.empty.title': { en: "Nothing matches that.", id: "Tidak ada yang cocok." },
  'filter.empty.desc': { en: "Try a shorter word or clear the filters.", id: "Coba kata yang lebih pendek atau hapus filter." },
  'filter.clear': { en: "CLEAR FILTERS", id: "HAPUS FILTER" },
  'filter.more': { en: "SHOW MORE ↓", id: "TAMPILKAN LAGI ↓" },
  'proj.a5.link':    { en:'PLAY THE GAME →', id:'MAINKAN GAME →' },

  'stats.eyebrow':    { en:'04 - GitHub stats', id:'04 - Statistik GitHub' },
  'stats.h1': { en: "My GitHub <em>activity.</em>", id: "Aktivitas <em>GitHub</em> saya." },
  'stats.intro': { en: "These numbers are generated automatically from my GitHub account, the same way as my profile README.", id: "Angka-angka ini dibuat otomatis dari akun GitHub saya, sama seperti README profil saya." },
  'stats.live.lbl':   { en:'Live metrics', id:'Metrik langsung' },
  'stats.live.sub':   { en:'auto-updated by github actions', id:'diperbarui otomatis oleh github actions' },
  'stats.streak.lbl': { en:'Current streak', id:'Streak saat ini' },
  'stats.streak.sub': { en:'updated daily', id:'diperbarui setiap hari' },
  'stats.cron.label': { en: "Next update", id: "Update berikutnya" },
  'stats.cron.sub': { en: "read from the repo workflow", id: "dibaca dari workflow repo" },
  'stats.cron.cycle': { en: "of the cycle", id: "dari siklus" },
  'stats.cron.days': { en: "days", id: "hari" },
  'stats.cron.hours': { en: "hours", id: "jam" },
  'stats.cron.mins': { en: "min", id: "mnt" },
  'stats.cron.secs': { en: "sec", id: "dtk" },
  'stats.cron.schedule': { en: "schedule (UTC)", id: "jadwal (UTC)" },
  'stats.cron.last': { en: "last run", id: "run terakhir" },
  'stats.cron.status': { en: "status", id: "status" },
  'stats.cron.source': { en: "source", id: "sumber" },
  'stats.auto1.desc': { en: "A scheduled GitHub Action that turns my activity into <span class=\"kbd\">github-metrics.svg</span>.", id: "GitHub Action terjadwal yang mengubah aktivitas saya menjadi <span class=\"kbd\">github-metrics.svg</span>." },
  'stats.auto2.desc': { en: "A streak card that pulls its numbers from a streak API.", id: "Kartu streak yang angkanya diambil dari streak API." },
  'stats.auto3.desc': { en: "A small Python script in the repo that feeds the streak automation.", id: "Skrip Python kecil di repo yang menyuplai otomasi streak." },

  'contact.eyebrow':    { en:'05 - Contact', id:'05 - Kontak' },
  'contact.h1':         { en:'Say <em>hello.</em>', id:'Tinggalkan <em>halo.</em>' },
  'contact.intro': { en: "Message me about a website project, a coding question, or just to chat about code and games.", id: "Kirim pesan soal proyek website, pertanyaan kode, atau sekadar ngobrol soal koding dan game." },
  'contact.email.desc': { en:'For work, projects, or collaboration. I usually reply within a couple of days.', id:'Untuk kerja, proyek, atau kolaborasi. Biasanya saya balas dalam beberapa hari.' },
  'contact.email.btn':  { en:'copy email', id:'salin email' },
  'contact.email.kbd': { en: "email · fastest", id: "email · paling cepat" },
  'contact.gh.desc': { en: "My code and experiments.", id: "Kode dan eksperimen saya." },
  'contact.ig.desc': { en: "Daily life, and sometimes a peek at my projects.", id: "Keseharian saya, kadang bocoran proyek." },
  'contact.tt.desc': { en: "Short clips and build stories.", id: "Klip singkat dan cerita proses bikin." },
  'contact.yt.desc': { en: "Longer videos: tutorials and walkthroughs.", id: "Video lebih panjang: tutorial dan walkthrough." },
  'contact.tg.desc': { en: "Quick messages.", id: "Untuk pesan singkat." },
  'contact.coffee.desc': { en: "If something here helped you, you can buy me a coffee.", id: "Kalau ada yang membantu, boleh traktir saya kopi." },
};

function getLang() {
  try {
    const q = new URLSearchParams(location.search).get('lang');
    if (q === 'id' || q === 'en') return q;
  } catch {}
  try { return localStorage.getItem(LANG_KEY) === 'id' ? 'id' : 'en'; } catch { return 'en'; }
}

function applyLang(lang) {
  document.documentElement.setAttribute('data-lang', lang);
  try { localStorage.setItem(LANG_KEY, lang); } catch {}
  try {
    const u = new URL(location.href);
    if (u.searchParams.has('lang') && u.searchParams.get('lang') !== lang) { u.searchParams.set('lang', lang); history.replaceState(null, '', u); }
  } catch {}
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const entry = T[key];
    if (!entry) return;

    const factValue = T[`${key}v`];
    if (key.startsWith('about.fact.') && factValue) {
      el.textContent = entry[lang] || entry.en;
      const value = document.createElement('b');
      value.textContent = factValue[lang] || factValue.en;
      el.append(value);
      return;
    }
    el.innerHTML = entry[lang] || entry.en;
  });
  const dateFmt = new Intl.DateTimeFormat(lang === 'id' ? 'id-ID' : 'en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });
  document.querySelectorAll('time[data-date]').forEach(t => { t.textContent = dateFmt.format(new Date(`${t.dataset.date}T00:00:00Z`)); });
  document.querySelectorAll('[data-i18n-alt]').forEach(el => {
    const entry = T[el.getAttribute('data-i18n-alt')];
    if (entry) el.alt = entry[lang] || entry.en;
  });
  document.querySelectorAll('.lang-btn').forEach(btn => {
    const active = btn.dataset.lang === lang;
    btn.classList.toggle('on', active);
    btn.setAttribute('aria-pressed', String(active));
  });
  document.documentElement.lang = lang === 'id' ? 'id' : 'en';
}

function initLangSwitch() {
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => applyLang(btn.dataset.lang));
  });
}

function applyConfig() {
  const c = window.SITE_CONFIG;
  if (!c) return;
  const valueOrDefault = (value, fallback) => {
    if (typeof value !== 'string') return fallback;
    const valueTrimmed = value.trim();
    return valueTrimmed && !valueTrimmed.startsWith('__') ? valueTrimmed : fallback;
  };
  const esc = s => s.replace(/[&<>"']/g, ch => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[ch]));
  const override = (key, value) => {
    const v = valueOrDefault(value, null);
    if (v !== null) T[key] = { en: esc(v), id: esc(v) };
  };
  override('home.eyebrow', c.role);
  override('home.status', c.tagline);
  [1, 2, 3, 4].forEach(n => override(`home.now.${n}`, c[`now_${n}`]));
  Object.assign(T, {
    'about.fact.locv':  { en: valueOrDefault(c.location,       T['about.fact.locv'].en),  id: valueOrDefault(c.location,       T['about.fact.locv'].id)  },
    'about.fact.statv': { en: valueOrDefault(c.status,         T['about.fact.statv'].en), id: valueOrDefault(c.status,         T['about.fact.statv'].id) },
    'about.fact.workv': { en: valueOrDefault(c.working_on,     T['about.fact.workv'].en), id: valueOrDefault(c.working_on,     T['about.fact.workv'].id) },
    'about.fact.openv': { en: valueOrDefault(c.open_to,        T['about.fact.openv'].en), id: valueOrDefault(c.open_to,        T['about.fact.openv'].id) },
    'about.fact.emv':   { en: valueOrDefault(c.email,          T['about.fact.emv'].en),   id: valueOrDefault(c.email,          T['about.fact.emv'].id)   },
  });
}

function setActiveNav() {
  document.querySelectorAll('.nav-link, .footer-link').forEach(link => {
    const href = link.getAttribute('href') || '';
    if (!href.startsWith('/')) return;
    const target = href.split('#')[0];
    if (path === target || (target !== '/' && path.startsWith(target + '/'))) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });
}

function revealOnScroll() {
  const els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) { els.forEach(e => e.classList.add('in')); return; }
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  els.forEach(el => {
    if (el.dataset.delay) el.style.setProperty('--d', `${el.dataset.delay}ms`);
    if (el.getBoundingClientRect().top < innerHeight * .95) {
      el.classList.add('in', 'reveal-instant');
      return;
    }
    io.observe(el);
  });
}

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

document.addEventListener('DOMContentLoaded', () => {
  setActiveNav();
  applyConfig();
  revealOnScroll();
  initCopyEmail();
  initLangSwitch();
  applyLang(getLang());
  initNoteTypography();
}, { once: true });


function initNoteTypography() {
  const all = ['note-font-0','note-font-1','note-font-2','note-font-3','note-font-4'];
  document.querySelectorAll('[data-note-fonts]').forEach(el => {
    let index = 0;
    el.addEventListener('click', e => {
      if (e.target.closest('a')) return;
      index = (index + 1) % all.length;
      el.classList.remove(...all);
      el.classList.add(all[index]);
      el.classList.toggle('font-shifted', index % 2 === 1);
    });
  });
}
