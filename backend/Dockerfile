FROM node:21

# Create app directory
WORKDIR /app

# Install app dependencies
COPY ./package.json /app
COPY ./package-lock.json /app
RUN npm ci
# If you are building your code for production
# RUN npm ci --only=production

# Copy the rest of the application code
COPY . /app

# Expose the application port
EXPOSE 5002

# Start the application using npx and nodemon
CMD ["npx", "nodemon", "./index.js"]
