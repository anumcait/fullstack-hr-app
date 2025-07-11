FROM node:20

WORKDIR /app

# 1️⃣  Install deps (nodemon must be listed in dependencies or devDependencies)
COPY package*.json ./
RUN npm install

# 2️⃣  Guarantee the binary is executable
RUN chmod +x node_modules/.bin/nodemon

# 3️⃣  Copy source
COPY . .

EXPOSE 5000

# 4️⃣  Start the server with nodemon directly
CMD ["sh", "-c", "node_modules/.bin/nodemon --legacy-watch index.js"]

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