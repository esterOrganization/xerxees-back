# Stage 1: Build the application
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source files
COPY . .

# Build the application
RUN npm run build

# Stage 2: Production image
FROM node:18-alpine AS production

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Copy built files from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/.env.production ./

# Expose the application port
EXPOSE 3200

# Command to run the application
CMD ["npm", "run", "start"]

# Stage 3: Development image
FROM node:18-alpine AS development

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies
RUN npm install

# Copy all source files
COPY . .

# Expose the application port
EXPOSE 3000

# Command to run the application in dev mode
CMD ["npm", "run", "start:dev"]