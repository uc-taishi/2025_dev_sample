#!/usr/bin/env bash
set -euo pipefail

cd sample-application
echo "[postCreate] CWD: $(pwd)"

echo "[postCreate] install deps with npm"
npm ci || npm install

# .env がなければ SQLite 用を生成
if [[ ! -f ".env" ]]; then
  cat > .env <<'EOF'
DATABASE_URL="file:./prisma/dev.db"
PRISMA_SCHEMA="prisma/sqlite/schema.prisma"
EOF
fi

# Prisma Client 生成
npx prisma generate --schema "${PRISMA_SCHEMA:-prisma/sqlite/schema.prisma}"

# ── ここがポイント ──
# マイグレーションが存在すれば deploy、無ければ db push でテーブルを作成
if [[ -d "prisma/migrations" && -n "$(ls -A prisma/migrations 2>/dev/null || true)" ]]; then
  echo "[postCreate] prisma migrate deploy"
  npx prisma migrate deploy --schema "${PRISMA_SCHEMA:-prisma/sqlite/schema.prisma}" || true
else
  echo "[postCreate] prisma db push (no migrations found)"
  npx prisma db push --schema "${PRISMA_SCHEMA:-prisma/sqlite/schema.prisma}"
fi

# seed（定義がある時だけ）
if node -e "const p=require('./package.json'); process.exit(p.prisma && p.prisma.seed ? 0 : 1)"; then
  echo "[postCreate] prisma db seed"
  npx prisma db seed --schema "${PRISMA_SCHEMA:-prisma/sqlite/schema.prisma}" || true
fi

echo "[postCreate] done"
