/* Site profile config — values here are replaced by CI before deploy.
   Set these as GitHub Actions repository variables (Settings → Secrets → Variables).
   Keys are the aliases mapped in workflows (scripts/inject-config.mjs):
   SITE_LOCATION | SITE_STATUS | SITE_WORKING_ON | SITE_OPEN_TO
   SITE_FAV_COLOR | SITE_EMAIL | SITE_ROLE | SITE_TAGLINE
   SITE_NOW_1..4 */
window.SITE_CONFIG = {
  // Keep these aliases intact: CI replaces them only when the corresponding
  // repository variable has a value. main.js falls back to the current About
  // page copy when an alias is left unresolved or a value is empty.
  location:      '__SITE_LOCATION__',
  status:        '__SITE_STATUS__',
  working_on:    '__SITE_WORKING_ON__',
  open_to:       '__SITE_OPEN_TO__',
  favorite_color:'__SITE_FAV_COLOR__',
  email:         '__SITE_EMAIL__',
  // hero / intro labels (optional injectables)
  role:          '__SITE_ROLE__',
  tagline:       '__SITE_TAGLINE__',
  now_1:         '__SITE_NOW_1__',
  now_2:         '__SITE_NOW_2__',
  now_3:         '__SITE_NOW_3__',
  now_4:         '__SITE_NOW_4__',
};
