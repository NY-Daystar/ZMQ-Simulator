FROM node:24.7.0-alpine

WORKDIR /usr/src/node-app

COPY package*.json ./

RUN npm install --omit=dev 

COPY . .

EXPOSE 3000 49152