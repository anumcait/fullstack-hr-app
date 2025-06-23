# Frontend Dockerfile
FROM node:20 AS builder
WORKDIR /app

# Copy everything including env
COPY . .

# Explicitly load development mode
ENV NODE_ENV=development

RUN npm install

# 👇 Force Vite to use `.env.development`
#RUN npm run build -- --mode development
RUN npm run build -- --mode production

# Serve with nginx
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
