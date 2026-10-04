# Legacy Pages redirect (`wladimirchagas.github.io`)

GitHub **does not** redirect `olduser.github.io` after a username rename.
The old host returns GitHub’s own 404, so no app HTML ever runs.

## Do not use repo name `Hana-s-flag-game` under this org

`github.com/wladimirchagas/Hana-s-flag-game` still **301-redirects** to
`wlad-c/Hana-s-flag-game`. Pushing there overwrites the real game (a
force-push did that once; `main` was restored to `14d0799`).

## Setup

1. Org **`wladimirchagas`** must exist.
2. Create a **public** org repository named exactly **`wladimirchagas.github.io`**
   (Settings → create new repo under the org).  
   https://github.com/organizations/wladimirchagas/repositories/new
3. From this game repo’s root:

   ```bash
   ./scripts/publish-legacy-pages-redirect.sh
   ```

4. Wait a minute, then open  
   https://wladimirchagas.github.io/Hana-s-flag-game/  
   — it should land on https://wlad-c.github.io/Hana-s-flag-game/.

The org site also serves `/Hana-s-flag-game/index.html` and a root `404.html`
so deep links (`/Hana-s-flag-game/learn/…`) redirect with the path preserved.
