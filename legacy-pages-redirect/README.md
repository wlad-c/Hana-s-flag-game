# Legacy Pages redirect (`wladimirchagas.github.io`)

GitHub **does not** redirect `olduser.github.io` after a username rename. The
old host returns GitHub’s own 404, so no app HTML (and no client redirect) ever
runs.

To make `https://wladimirchagas.github.io/Hana-s-flag-game/` work again, reclaim
the old username as a **public organization** and publish this folder as that
org’s `Hana-s-flag-game` GitHub Pages site.

## One-time setup

1. Create org **`wladimirchagas`**: https://github.com/account/organizations/new  
   (github.com/wladimirchagas currently 404s, so the name should be free.)
2. From this repo’s root, run:

   ```bash
   ./scripts/publish-legacy-pages-redirect.sh
   ```

   Or manually: create public repo `wladimirchagas/Hana-s-flag-game`, copy these
   files to its root, enable **Settings → Pages → Deploy from branch `main` /
   `/ (root)`**.

3. Wait a minute, then open  
   https://wladimirchagas.github.io/Hana-s-flag-game/  
   — it should land on https://wlad-c.github.io/Hana-s-flag-game/.

## Note on github.com redirects

Creating `wladimirchagas/Hana-s-flag-game` **replaces** GitHub’s automatic
repo redirect for that name. The org repo README points people at
`wlad-c/Hana-s-flag-game`. Leave the real game under `wlad-c`.
