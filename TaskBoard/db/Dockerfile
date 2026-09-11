FROM postgres:16

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
       curl=8.14.1-2+deb13u4 \
       jq=1.7.1-6+deb13u3 \
    && rm -rf /var/lib/apt/lists/*

COPY start.sh /usr/local/bin/vault-db-start.sh

RUN chmod +x /usr/local/bin/vault-db-start.sh

ENTRYPOINT ["/usr/local/bin/vault-db-start.sh"]
