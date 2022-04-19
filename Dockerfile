FROM node:alpine

WORKDIR /home/node/app
COPY . ./
RUN npm install 
CMD node index.js
