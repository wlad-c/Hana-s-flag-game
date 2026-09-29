#!/usr/bin/env bash
# Prints a Flags of the World page as text, with every link shown as [target].
#
#   scripts/flag-audit/fotw-page.sh it-reg.html          # a country's index
#   scripts/flag-audit/fotw-page.sh it-tr.html           # a province page
#
# Always reach a page through its country INDEX (it.html, it-reg.html,
# it-muni.html, co-.html, …) and follow the link printed there. A filename
# guessed from a pattern can 404, and a 404 is never proof that no page exists
# (CLAUDE.md, "A 404 on a guessed URL is never proof a source doesn't exist").
# The cached HTML keeps the image paths: grep it for 'images/' to fetch the
# page's own flag image from https://www.crwflags.com/fotw/<path>.
set -euo pipefail
page=$1
cache=${FLAG_AUDIT_CACHE:-${TMPDIR:-/tmp}/flag-audit-cache}/fotw
mkdir -p "$cache"
f="$cache/$page"
if [ ! -s "$f" ]; then
  curl -s --max-time 30 -A "Mozilla/5.0 (flag audit)" "https://www.crwflags.com/fotw/flags/$page" -o "$f"
  sleep 1
fi
if grep -q -i "<title>404" "$f"; then echo "404: $page (find the real page through the country index)" >&2; exit 4; fi
python3 - "$f" <<'PY'
import sys, re, html
t = open(sys.argv[1], encoding="latin-1").read()
t = re.sub(r"(?is)<(script|style).*?</\1>", "", t)
t = re.sub(r'(?i)<a [^>]*href="([^"]+)"[^>]*>', r"[\1] ", t)
t = re.sub(r"(?s)<[^>]+>", " ", t)
t = html.unescape(t)
t = re.sub(r"[ \t]+", " ", t)
t = re.sub(r"\n\s*\n+", "\n", t)
print(t)
PY
