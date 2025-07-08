
# Step 1: Use a lightweight Node.js image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the React app into the container
COPY . .

# Build the app for production
RUN npm run build

# Install a simple HTTP server to serve the build files
#RUN npm install -g serve

# Serve the build files using the HTTP server
CMD ["npm", "run", "start"]
