/* Site profile config — values here are replaced by CI before deploy.
   Set these as GitHub Actions repository variables (Settings → Secrets → Variables).
   Keys are the aliases mapped in workflows (scripts/inject-config.mjs):
   SITE_LOCATION | SITE_STATUS | SITE_WORKING_ON | SITE_OPEN_TO
   SITE_FAV_COLOR | SITE_EMAIL | SITE_ROLE | SITE_TAGLINE
   SITE_NOW_1..4 */
window.SITE_CONFIG = {
  location:      'Indonesia 🇮🇩',
  status:        'active',
  working_on:    'personal project',
  open_to:       'collaborate',
  favorite_color:'blue 💙',
  email:         'linggasaja03@gmail.com',
  // hero / intro labels (optional injectables)
  role:          '__SITE_ROLE__',
  tagline:       '__SITE_TAGLINE__',
  now_1:         '__SITE_NOW_1__',
  now_2:         '__SITE_NOW_2__',
  now_3:         '__SITE_NOW_3__',
  now_4:         '__SITE_NOW_4__',
};