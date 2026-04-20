# ─────────────────────────────────────────────────────────────────────────────
# Dockerfile — LOCAL DEVELOPMENT ONLY
#
# This is NOT used in production. Production is a static S3/CloudFront deploy.
# This container runs the Vite dev server with hot-reload for local development.
# ─────────────────────────────────────────────────────────────────────────────

FROM node:20-alpine

WORKDIR /app

# Install dependencies first (cached layer — only re-runs if package.json changes)
COPY package.json package-lock.json* ./
RUN npm install

# Copy source files
COPY . .

# Expose Vite dev server port
EXPOSE 5173

# Start Vite dev server, binding to 0.0.0.0 so it's accessible from the host
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
