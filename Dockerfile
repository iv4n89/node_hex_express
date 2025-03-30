FROM node:18

# Create and set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the source code
COPY . .

# Compile TypeScript
RUN npm run build

# Expose the application port
EXPOSE 3000

# Command to start the application
CMD ["npm", "start"]
