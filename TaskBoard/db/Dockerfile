FROM postgres:16

RUN apt-get update \
    && apt-get install -y --no-install-recommends curl jq \
    && rm -rf /var/lib/apt/lists/*

COPY start.sh /usr/local/bin/vault-db-start.sh

RUN chmod +x /usr/local/bin/vault-db-start.sh

ENTRYPOINT ["/usr/local/bin/vault-db-start.sh"]
