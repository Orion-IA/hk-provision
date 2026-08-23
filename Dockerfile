# syntax=docker/dockerfile:1

FROM node:22-bookworm-slim AS build
WORKDIR /app

COPY package.json package-lock.json ./
# The lockfile is generated on Windows, so it only records win32 native
# bindings for packages like rolldown, lightningcss and @tailwindcss/oxide.
# npm honors those wrong-platform entries and never installs the Linux
# binaries (npm bug #4828). The documented workaround is to drop the
# lockfile and install fresh so npm resolves the correct Linux binaries.
RUN rm -f package-lock.json \
 && npm install --include=optional --no-audit --no-fund

COPY . .
RUN npm run build

FROM node:22-bookworm-slim AS production
WORKDIR /app
ENV NODE_ENV=production
ENV NITRO_HOST=0.0.0.0
ENV NITRO_PORT=3000

COPY --from=build --chown=node:node /app/.output ./.output

USER node
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:3000/').then(r => { if (!r.ok) process.exit(1) }).catch(() => process.exit(1))"

CMD ["node", ".output/server/index.mjs"]
