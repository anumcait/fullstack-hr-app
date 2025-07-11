FROM node:20
WORKDIR /app
COPY package*.json ./
RUN npm install
# 👇 Ensure nodemon is executable
RUN chmod +x node_modules/.bin/nodemon
COPY . .
EXPOSE 5000
CMD ["npx", "nodemon", "--legacy-watch", "index.js"]
# FROM node:20
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .
# EXPOSE 5000
# CMD ["npx", "nodemon", "index.js"]

# FROM node:20

# WORKDIR /app

# COPY package*.json ./
# RUN npm install

# COPY . .

# # Default CMD overridden by docker-compose
# CMD ["npx", "nodemon", "index.js"]