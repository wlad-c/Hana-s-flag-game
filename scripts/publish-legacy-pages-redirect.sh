#!/usr/bin/env bash
# Publish legacy-pages-redirect/ to org wladimirchagas/Hana-s-flag-game (Pages).
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="$ROOT/legacy-pages-redirect"
ORG="${LEGACY_PAGES_ORG:-wladimirchagas}"
REPO="${LEGACY_PAGES_REPO:-Hana-s-flag-game}"
FULL="$ORG/$REPO"
NEW_SITE="${NEW_PAGES_ORIGIN:-https://wlad-c.github.io}"

if ! command -v gh >/dev/null; then
  echo "Need the GitHub CLI (gh)." >&2
  exit 1
fi
if ! gh auth status >/dev/null 2>&1; then
  echo "Run: gh auth login" >&2
  exit 1
fi

if ! gh api "orgs/$ORG" >/dev/null 2>&1; then
  cat >&2 <<MSG
Org '$ORG' does not exist (or this token cannot see it).

Create it first (name must be exactly '$ORG'):
  https://github.com/account/organizations/new

Then re-run this script.
MSG
  exit 1
fi

if ! gh api "repos/$FULL" >/dev/null 2>&1; then
  echo "Creating public repo $FULL …"
  gh repo create "$FULL" --public --description "Pages redirect → ${NEW_SITE}/${REPO}/"
fi

TMP="$(mktemp -d)"
cleanup() { rm -rf "$TMP"; }
trap cleanup EXIT

cp "$SRC/index.html" "$SRC/404.html" "$SRC/.nojekyll" "$TMP/"
cp "$SRC/REPO_README.md" "$TMP/README.md"

cd "$TMP"
git init -q
git checkout -q -b main
git add -A
git -c user.name='legacy-pages-redirect' -c user.email='noreply@github.com' \
  commit -qm "Redirect wladimirchagas.github.io → wlad-c.github.io"
git remote add origin "https://github.com/${FULL}.git"

# Prefer gh token push
if gh auth setup-git >/dev/null 2>&1; then
  git push -u origin main --force
else
  git push -u origin main --force
fi

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
echo "Done. Check:"
echo "  https://${ORG}.github.io/${REPO}/"
echo "  (should redirect to ${NEW_SITE}/${REPO}/)"
echo
echo "Pages status:"
gh api "repos/$FULL/pages" --jq '{html_url,status,source}' 2>/dev/null || true
