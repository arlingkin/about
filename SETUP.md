# Setup Firebase Hosting (multi-site)

1. `npm i -g firebase-tools` lalu `firebase login`
2. Buat project di [console.firebase.google.com](https://console.firebase.google.com)
3. Di Firebase Console → Hosting, buat 2 site: satu untuk domain utama, satu untuk subdomain
4. Ganti `GANTI_DENGAN_PROJECT_ID` di `.firebaserc` dengan project ID asli
5. Jalankan dari root repo ini:
   ```
   firebase target:apply hosting main <site-id-domain-utama>
   firebase target:apply hosting app <site-id-subdomain>
   firebase deploy --only hosting
   ```
6. Hubungkan custom domain di Hosting → Add custom domain untuk masing-masing site

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
