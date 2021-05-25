FROM node:14.12.0

# Create app directory
RUN mkdir -p /usr/src/face-recognition-api
WORKDIR /usr/src/face-recognition-api

# Install app dependencies
COPY package.json /usr/src/face-recognition-api
RUN npm install

# Bundle app source
COPY . /usr/src/face-recognition-api

# Build arguments
ARG NODE_VERSION=14.12.0

# Environment
ENV NODE_VERSION $NODE_VERSION