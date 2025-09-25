FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./
COPY proxy/package.json ./proxy/
COPY common/package.json ./common/
COPY model/package.json ./model/

# Install pnpm
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build the proxy service
WORKDIR /app/proxy
RUN pnpm build

# Expose port
EXPOSE 3002

# Start the proxy service
CMD ["pnpm", "start"]
