# React Dockerfile

# 1. Set the base image
FROM node:14

# 2. Set the working directory
WORKDIR /app

# 3. Copy package.json and package-lock.json
COPY package*.json ./

# 4. Install dependencies
RUN npm install

# 5. Copy the rest of the application
COPY . .

# 6. Build the application
RUN npm run build

# 7. Serve the application using a suitable server
FROM nginx:stable-alpine
COPY --from=0 /app/dist /usr/share/nginx/html
