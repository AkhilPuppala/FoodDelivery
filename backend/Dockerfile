FROM node:21

# Create app directory
WORKDIR /app

# Install nodemon globally
RUN npm install -g nodemon

# Copy package files first to leverage Docker layer caching for dependencies
COPY ./package.json /app
COPY ./package-lock.json /app

# Install app dependencies
RUN npm ci
# If you are building your code for production
# RUN npm ci --only=production

# Copy the rest of the application code
COPY . /app

# Expose the application port
EXPOSE 5002

# Start the application using nodemon with index.js
CMD ["nodemon", "index.js"]
