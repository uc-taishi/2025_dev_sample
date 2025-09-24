# syntax=docker/dockerfile:1.7
ARG NODE_VERSION=20
FROM node:${NODE_VERSION}-bookworm

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
      git curl bash ca-certificates openssl \
      libc6-dev build-essential python3-minimal \
      sqlite3 \
    && rm -rf /var/lib/apt/lists/*

USER node
WORKDIR /workspace

SHELL ["/bin/bash", "-lc"]
