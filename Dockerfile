# =========================================================================
# Single Deployable Unit Docker Container for College Management System
# =========================================================================

FROM node:22-alpine

# Set Working Directory
WORKDIR /app

# Set Environment Variables
ENV NODE_ENV=production
ENV PORT=3000

# Copy package descriptors
COPY package*.json ./

# Install production dependencies
RUN npm install --omit=dev

# Copy application source code
COPY . .

# Expose default port
EXPOSE 3000

# Healthcheck probe
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/api/health || exit 1

# Start the Monolithic Server
CMD ["node", "server.js"]
