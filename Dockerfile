# Stage 1: Builder for both environments
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Production image
FROM node:18-alpine AS production
WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma
RUN npm ci --only=production
COPY --from=builder /app/dist ./dist
EXPOSE 3200
CMD ["npm", "run", "start"]

# Stage 3: Development image
FROM node:18-alpine AS development
WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma
RUN npm ci
COPY . .
EXPOSE 3000
CMD ["npm", "run", "start:dev"]