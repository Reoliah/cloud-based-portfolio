FROM node:20-alpine

WORKDIR /usr/src/app

# Copy package dependency first to leverage Docker cache
COPY package*.json ./

# Install only absolute production packages
RUN npm ci --only=production

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 4000

USER node

# Start the application
CMD ["node", "server/index.js"]