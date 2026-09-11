#!/bin/sh
set -e

: "${VAULT_TOKEN:?VAULT_TOKEN is not set}"

VAULT_ADDR="${VAULT_ADDR:-http://host.docker.internal:8200}"

echo "Retrieving database credentials from Vault..."

SECRETS=$(curl -fsS \
  -H "X-Vault-Token: ${VAULT_TOKEN}" \
  "${VAULT_ADDR}/v1/kv/data/myapp/todo")

export DB_HOST=$(echo "$SECRETS" | jq -r '.data.data.host')
export DB_PORT=$(echo "$SECRETS" | jq -r '.data.data.port')
export DB_USER=$(echo "$SECRETS" | jq -r '.data.data.user')
export DB_PASS=$(echo "$SECRETS" | jq -r '.data.data.pass')
export DB_NAME=$(echo "$SECRETS" | jq -r '.data.data.name')

echo "Vault secrets retrieved successfully."

echo "Running database migrations..."

alembic upgrade head

echo "Starting FastAPI application..."

exec uvicorn src.main:app --host 0.0.0.0 --port 8000
