#!/usr/bin/env bash
# Prints the path of a cached copy of a Wikipedia article's raw wikitext,
# following redirects. Reading the wikitext (not a summary) is how the audit
# finds a "Bandiera"/"Vlajka"/"Flaga"/"Simboli" section below an article's lead.
#
#   scripts/flag-audit/wiki-raw.sh it "Provincia di Terni"
#   grep -n -i "bandiera" "$(scripts/flag-audit/wiki-raw.sh it 'Provincia di Terni')"
#
# Uses index.php?action=raw, which keeps working when Wikimedia's api.php
# answers 429. Cache: $FLAG_AUDIT_CACHE (default ${TMPDIR:-/tmp}/flag-audit-cache).
set -euo pipefail
lang=$1; title=$2; depth=${3:-0}
cache=${FLAG_AUDIT_CACHE:-${TMPDIR:-/tmp}/flag-audit-cache}/wiki
mkdir -p "$cache"
ua="HanaFlagGameAudit/1.0 (https://github.com/wladimirchagas/Hana-s-flag-game)"
f="$cache/${lang}_$(printf %s "$title" | md5sum | cut -c1-12).txt"
if [ ! -s "$f" ]; then
  enc=$(python3 -c 'import sys,urllib.parse;print(urllib.parse.quote(sys.argv[1].replace(" ","_")))' "$title")
  curl -s -L --max-time 30 -A "$ua" "https://$lang.wikipedia.org/w/index.php?title=$enc&action=raw" -o "$f"
  sleep 1
  if grep -q -E "Wikimedia Error|Too many requests" "$f"; then rm -f "$f"; echo "rate-limited; retry later" >&2; exit 3; fi
fi
# A redirect is the page's first line: #REDIRECT or a translation (pl PATRZ, cs PŘESMĚRUJ,
# de WEITERLEITUNG, es REDIRECCIÓN, it RINVIA, ru ПЕРЕНАПРАВЛЕНИЕ, …). Only line 1 counts, so
# a numbered list item ("# [[…]]") further down is never mistaken for one.
target=$(head -1 "$f" | grep -i -o -E "^#[^ [#]+ *\[\[[^]|#]+" | sed 's/.*\[\[//' || true)
if [ -n "$target" ] && [ "$depth" -lt 3 ]; then exec "$0" "$lang" "$target" $((depth + 1)); fi
echo "$f"
