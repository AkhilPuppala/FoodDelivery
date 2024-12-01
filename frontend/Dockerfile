FROM node:21

# Create app directory
WORKDIR /app

# Install app dependencies
COPY ./package.json /app
COPY ./package-lock.json /app
RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . /app

# Expose the application port
EXPOSE 3000

# Start the application using npm start
CMD ["npm", "start"]
