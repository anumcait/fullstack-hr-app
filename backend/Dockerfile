FROM node:20
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
#EXPOSE 3000
CMD ["npx", "nodemon", "index.js"]

# FROM node:20

# WORKDIR /app

# COPY package*.json ./
# RUN npm install

# COPY . .

# # Default CMD overridden by docker-compose
# CMD ["npx", "nodemon", "index.js"]