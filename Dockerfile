# Use the official Node.js image
FROM node:22

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the application
COPY . .

# Expose the port your app listens on
EXPOSE 5000

# Start the application
CMD ["node", "index.js"]
