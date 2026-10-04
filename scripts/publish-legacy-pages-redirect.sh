#!/usr/bin/env bash
# Publish legacy-pages-redirect/ to org site wladimirchagas.github.io
#
# IMPORTANT: never push to wladimirchagas/Hana-s-flag-game — GitHub's rename
# redirect still points that name at wlad-c/Hana-s-flag-game, so a push would
# overwrite the real game (this happened once; main was restored).
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="$ROOT/legacy-pages-redirect"
ORG="${LEGACY_PAGES_ORG:-wladimirchagas}"
REPO="${LEGACY_PAGES_REPO:-wladimirchagas.github.io}"
FULL="$ORG/$REPO"
GAME_REPO_ID="${GAME_REPO_ID:-1239682722}" # wlad-c/Hana-s-flag-game
NEW_SITE="${NEW_PAGES_ORIGIN:-https://wlad-c.github.io/Hana-s-flag-game/}"

if ! command -v gh >/dev/null; then
  echo "Need the GitHub CLI (gh)." >&2
  exit 1
fi
if ! gh auth status >/dev/null 2>&1; then
  echo "Run: gh auth login" >&2
  exit 1
fi

if [[ "$REPO" == "Hana-s-flag-game" ]]; then
  cat >&2 <<MSG
Refusing to publish to $FULL.

That repository name still 301-redirects to wlad-c/Hana-s-flag-game.
Use the org Pages repo instead: $ORG/wladimirchagas.github.io
MSG
  exit 1
fi

if ! gh api "orgs/$ORG" >/dev/null 2>&1; then
  cat >&2 <<MSG
Org '$ORG' does not exist (or this token cannot see it).

Create it first (name must be exactly '$ORG'):
  https://github.com/account/organizations/new
MSG
  exit 1
fi

# Detect the rename-redirect trap: API may resolve an old name to the game repo.
resolve_id() {
  gh api "repos/$1" --jq .id 2>/dev/null || true
}

if [[ "$(resolve_id "$FULL")" == "$GAME_REPO_ID" ]]; then
  echo "Refusing: repos/$FULL resolves to the real game repo (id $GAME_REPO_ID)." >&2
  exit 1
fi

if ! gh api "repos/$FULL" >/dev/null 2>&1; then
  cat >&2 <<MSG
Repo $FULL does not exist yet (or this token cannot create it).

Create a public repository named exactly:
  $REPO
under the $ORG organization:
  https://github.com/organizations/$ORG/repositories/new

Then re-run this script. Do NOT create a repo named Hana-s-flag-game under
$ORG — that name still redirects to the real game.
MSG
  exit 1
fi

TARGET_ID="$(resolve_id "$FULL")"
if [[ "$TARGET_ID" == "$GAME_REPO_ID" ]]; then
  echo "Refusing: $FULL is the game repo." >&2
  exit 1
fi

TMP="$(mktemp -d)"
cleanup() { rm -rf "$TMP"; }
trap cleanup EXIT

mkdir -p "$TMP/Hana-s-flag-game"
cp "$SRC/index.html" "$SRC/404.html" "$SRC/.nojekyll" "$TMP/"
cp "$SRC/Hana-s-flag-game/index.html" "$TMP/Hana-s-flag-game/"
cp "$SRC/REPO_README.md" "$TMP/README.md"

cd "$TMP"
git init -q
git checkout -q -b main
git add -A
git -c user.name='legacy-pages-redirect' -c user.email='noreply@github.com' \
  commit -qm "Redirect wladimirchagas.github.io → wlad-c.github.io"

# Push by numeric id so we never follow a rename redirect to the game.
CLONE_URL="$(gh api "repos/$FULL" --jq .clone_url)"
echo "Publishing to $FULL (id $TARGET_ID) …"
git remote add origin "$CLONE_URL"
gh auth setup-git >/dev/null 2>&1 || true
git push -u origin main --force

echo "Enabling GitHub Pages (branch main, /) …"
gh api -X POST "repos/$FULL/pages" \
  -f "build_type=legacy" \
  -f "source[branch]=main" \
  -f "source[path]=/" \
  >/dev/null 2>&1 \
  || gh api -X PUT "repos/$FULL/pages" \
       -f "build_type=legacy" \
       -f "source[branch]=main" \
       -f "source[path]=/" \
       >/dev/null 2>&1 \
  || true

echo
echo "Done. Check (may take a minute to propagate):"
echo "  https://${ORG}.github.io/Hana-s-flag-game/"
echo "  → should open ${NEW_SITE}"
echo
gh api "repos/$FULL/pages" --jq '{html_url,status,source}' 2>/dev/null || true
