#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "==> Linting VitePress theme"
npm run lint

echo
echo "==> Building without rewriting the tracked sitemap"
SITEMAP_NO_WRITE=1 npm run build
