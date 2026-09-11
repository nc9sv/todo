#!/bin/sh
set -e

: "${VAULT_TOKEN:?VAULT_TOKEN is not set}"

VAULT_ADDR="${VAULT_ADDR:-http://host.docker.internal:8200}"

echo "Retrieving PostgreSQL credentials from Vault..."

SECRETS=$(curl -fsS \
  -H "X-Vault-Token: ${VAULT_TOKEN}" \
  "${VAULT_ADDR}/v1/kv/data/myapp/todo")

export POSTGRES_USER=$(echo "$SECRETS" | jq -r '.data.data.user')
export POSTGRES_PASSWORD=$(echo "$SECRETS" | jq -r '.data.data.pass')
export POSTGRES_DB=$(echo "$SECRETS" | jq -r '.data.data.name')

echo "Vault secrets retrieved successfully."

exec docker-entrypoint.sh postgres
