#!/usr/bin/env bash
#
# Deploy the static export to sf03 (47.115.138.206).
#
# Usage:
#   bash scripts/deploy-sf03.sh              # verify, build, upload
#   bash scripts/deploy-sf03.sh --skip-build # upload the existing out/
#
# Environment overrides:
#   DEPLOY_HOST  ssh host alias (default: sf03)
#   DEPLOY_DIR   remote document root (default: /var/www/seventiming.com)
#
# The nginx vhost itself lives in deploy/nginx/seventiming.com.conf and only needs
# to be reinstalled when that file changes; see README.md.

set -euo pipefail

DEPLOY_HOST="${DEPLOY_HOST:-sf03}"
DEPLOY_DIR="${DEPLOY_DIR:-/var/www/seventiming.com}"

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

if [[ "${1:-}" != "--skip-build" ]]; then
  echo "==> Verifying and building the static export"
  pnpm verify
fi

if [[ ! -f out/index.html ]]; then
  echo "error: out/index.html is missing; run without --skip-build" >&2
  exit 1
fi

echo "==> Ensuring $DEPLOY_HOST:$DEPLOY_DIR exists"
ssh "$DEPLOY_HOST" "mkdir -p '$DEPLOY_DIR' && chown -R root:root '$DEPLOY_DIR' && chmod 755 '$DEPLOY_DIR'"

echo "==> Uploading out/ to $DEPLOY_HOST:$DEPLOY_DIR"
# macOS ships openrsync (rsync 2.6.9 compatible), which has no --chmod; permissions
# are normalised on the server afterwards instead.
rsync -az --delete \
  --exclude '.DS_Store' \
  out/ "$DEPLOY_HOST:$DEPLOY_DIR/"

echo "==> Checking the deployment"
ssh "$DEPLOY_HOST" "chown -R root:root '$DEPLOY_DIR' && find '$DEPLOY_DIR' -type d -exec chmod 755 {} + && find '$DEPLOY_DIR' -type f -exec chmod 644 {} +"
ssh "$DEPLOY_HOST" "test -f '$DEPLOY_DIR/index.html' && test -f '$DEPLOY_DIR/404.html' && du -sh '$DEPLOY_DIR'"
ssh "$DEPLOY_HOST" "curl -fsS -o /dev/null -w 'https %{http_code}, http/2 %{http_version}\n' --resolve seventiming.com:443:127.0.0.1 https://seventiming.com/ || echo 'warning: https check failed (vhost or certificate not set up yet)'"

echo "==> Done. https://seventiming.com serves $DEPLOY_HOST:$DEPLOY_DIR"
