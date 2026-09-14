# Setup Firebase Hosting (multi-site)

1. `npm i -g firebase-tools` lalu `firebase login`
2. Buat project di [console.firebase.google.com](https://console.firebase.google.com)
3. Di Firebase Console → Hosting, buat 2 site: satu untuk domain utama, satu untuk subdomain
4. Jalankan dari root repo ini:
   ```
   firebase target:apply hosting main <site-id-domain-utama>
   firebase target:apply hosting app <site-id-subdomain>
   firebase deploy --only hosting
   ```
5. Hubungkan custom domain di Hosting → Add custom domain untuk masing-masing site

## CI/CD (GitHub Actions)

Repo sudah berisi 2 workflow di `.github/workflows/`, aktif tiap push ke `main` dan bisa
dijalankan manual via tab **Actions → Run workflow**.

### Deploy otomatis ke Firebase Hosting
1. Jalankan sekali `firebase login:ci` lalu salin tokennya.
2. Buka repo GitHub → **Settings → Secrets and variables → Actions**.
3. Tambah secret `FIREBASE_TOKEN` dengan nilai token dari `login:ci`.
4. Workflow `firebase-hosting.yml` akan menjalankan `firebase deploy --only hosting`.

### Deploy otomatis ke GitHub Pages
1. Buka repo GitHub → **Settings → Pages** → Source pilih **GitHub Actions**.
2. Workflow `github-pages.yml` menggunakan environment `github-pages` dan
   action resmi `deploy-pages`. Tidak perlu secret tambahan.
3. Setelah deploy pertama, situs tampil di `https://<username>.github.io/about/`.

## Routing (clean URLs)

Site utama adalah multi-halaman statis. `firebase.json` memetakan path ke file HTML:

| Route     | File          |
| --------- | ------------- |
| `/`       | `index.html`  |
| `/about`  | `about.html`  |
| `/skills` | `skills.html` |
| `/projects` | `projects.html` |
| `/stats`  | `stats.html`  |
| `/contact`| `contact.html` |

Semua path lain di-rewrite ke `/`. Style bersama ada di `assets/css/style.css`,
script bersama di `assets/js/main.js` (active nav, reveal animation, copy email).
