FROM node:21

# Set working directory
WORKDIR /app

# Install app dependencies
COPY package.json package-lock.json /app/

# Install dependencies
RUN npm install

# Copy app source code
COPY . /app

# Expose the application port
EXPOSE 3000

# Start the application using npm start
CMD ["npm", "start"]
