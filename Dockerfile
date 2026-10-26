# Production image: builds the React app, then FastAPI serves it alongside the API.
FROM node:24-bookworm-slim AS web-build
WORKDIR /app/web
COPY web/package.json web/package-lock.json ./
RUN npm ci
COPY web/ ./
# The SPA build prerenders index.html through a temporary Vite server on "localhost";
# in Linux containers that resolves to IPv6 first and the request misses the server.
RUN NODE_OPTIONS=--dns-result-order=ipv4first npm run build

FROM ghcr.io/astral-sh/uv:python3.12-bookworm-slim
WORKDIR /app
ENV UV_COMPILE_BYTECODE=1 UV_LINK_MODE=copy
# install dependencies first so they're cached between code changes
COPY pyproject.toml uv.lock README.md ./
RUN uv sync --locked --no-dev --no-install-project
COPY src ./src
COPY alembic.ini ./
COPY migrations ./migrations
RUN uv sync --locked --no-dev
COPY --from=web-build /app/web/build/client ./web/build/client
EXPOSE 8000
CMD ["uv", "run", "--no-sync", "fastapi", "run", "--host", "0.0.0.0", "--port", "8000"]
