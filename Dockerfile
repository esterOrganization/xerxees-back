# Stage 1: Build the application
FROM node:21-alpine AS builder
RUN apk add --no-cache python3 make g++ openssl
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Production image
FROM node:21-alpine AS production
RUN apk add --no-cache openssl
WORKDIR /app
COPY package*.json ./
RUN npm install --only=production
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/.env.production ./
EXPOSE 3200
CMD ["node", "dist/main"]

# Stage 3: Development image
FROM node:21-alpine AS development
RUN apk add --no-cache python3 make g++ openssl
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "start:dev"]