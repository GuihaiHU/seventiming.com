#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CHROME="${CHROME_BIN:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"

if [[ ! -x "$CHROME" ]]; then
  echo "Chrome not found at: $CHROME" >&2
  echo "Set CHROME_BIN to a Chrome or Chromium executable." >&2
  exit 1
fi

PROFILE="$(mktemp -d)"
trap 'rm -rf "$PROFILE"' EXIT

# --no-sandbox keeps headless Chrome working inside sandboxed agent runtimes.
# The rendered input is the trusted local template in this repository.
"$CHROME" \
  --headless=new \
  --no-sandbox \
  --disable-setuid-sandbox \
  --disable-gpu \
  --disable-software-rasterizer \
  --disable-crash-reporter \
  --disable-breakpad \
  --disable-dev-shm-usage \
  --hide-scrollbars \
  --force-device-scale-factor=1 \
  --user-data-dir="$PROFILE" \
  --window-size=1200,630 \
  --screenshot="$ROOT/public/og.png" \
  "file://$ROOT/scripts/og-template.html"

echo "Wrote $ROOT/public/og.png"
