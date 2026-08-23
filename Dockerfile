# syntax=docker/dockerfile:1

FROM node:22-bookworm-slim AS build
WORKDIR /app

COPY package.json package-lock.json ./
# The lockfile is generated on Windows, so it only records the win32 native
# binding for rolldown (Vite's bundler). npm ci won't install the Linux one,
# so add it explicitly here (npm bug #4828 with cross-platform optional deps).
RUN npm ci \
 && npm install --no-save @rolldown/binding-linux-x64-gnu@1.2.5

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
