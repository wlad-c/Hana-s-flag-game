#!/usr/bin/env bash
# Shows a Wikimedia Commons file's description page, then downloads the file.
#
#   scripts/flag-audit/commons-file.sh "Flag of the province of Udine.svg" /tmp/refs
#
# Read the description before trusting the file: "{{own}}" with no source, a
# {{fictitious flag}} / {{proposed flag}} tag, "(until 2024)" in the name, or a
# drawing "based on" another place's flag are all reasons to stop and look for
# an independent source (FOTW, the local-language Wikipedia, the official site).
# upload.wikimedia.org answers 429 when hit quickly; this retries patiently and
# refuses to save an HTML error page as an image.
set -euo pipefail
name=$1; out=${2:-.}
mkdir -p "$out"
ua="HanaFlagGameAudit/1.0 (https://github.com/wladimirchagas/Hana-s-flag-game)"
enc=$(python3 -c 'import sys,urllib.parse;print(urllib.parse.quote(sys.argv[1].replace(" ","_")))' "$name")
echo "── description ─────────────────────────────"
curl -s --max-time 30 -A "$ua" "https://commons.wikimedia.org/w/index.php?title=File:$enc&action=raw" | head -40
echo "── download ────────────────────────────────"
dest="$out/$(printf %s "$name" | tr ' ' '_')"
for attempt in 1 2 3 4 5 6; do
  curl -s -L --max-time 60 -A "$ua" -o "$dest" "https://commons.wikimedia.org/wiki/Special:FilePath/$enc" || true
  if head -c 400 "$dest" | grep -q -a -E "<svg|<\?xml|PNG|JFIF|Exif|GIF8|WEBP"; then echo "saved $dest"; exit 0; fi
  echo "attempt $attempt: not an image yet (rate limit or missing file); waiting" >&2
  sleep $((attempt * 30))
done
rm -f "$dest"; echo "gave up on $name" >&2; exit 5
