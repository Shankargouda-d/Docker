# Use the official Node.js 20 slim image as our base
FROM node:20-slim

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on (matching our lesson example)
EXPOSE 3000

# Set environment
ENV NODE_ENV=development

# Start Vite explicitly on port 3000 to match the example
CMD ["npm", "run", "dev", "--", "--port", "3000", "--host", "0.0.0.0"]
