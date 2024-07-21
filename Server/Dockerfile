# Use the official Node.js image as a parent image
FROM node:22-alpine3.20

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available) to the working directory
COPY package.json ./
# COPY package-lock.json ./  # Uncomment if you have a package-lock.json file

# Install production dependencies
RUN npm install --omit=dev

# Copy the rest of the application code to the working directory
COPY . .

# Expose port 3000 for the application
EXPOSE 3000

# Define the command to run the application
CMD [ "npm", "start" ]
