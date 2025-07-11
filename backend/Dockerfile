FROM node:20
WORKDIR /app
COPY package*.json ./
RUN npm install          # installs nodemon
COPY . .
EXPOSE 5000
CMD ["npm", "run", "dev"]

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