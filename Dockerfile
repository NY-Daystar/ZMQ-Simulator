FROM node:24.7.0-alpine as builder 

WORKDIR /builds

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build:publisher
RUN npm run build:consumer


FROM node:24.7.0-alpine

WORKDIR /usr/src/node-app

COPY package.json ./
RUN npm install --omit=dev 

COPY --from=builder /builds/publisher/dist publisher/dist
COPY publisher/ecosystem.config.json publisher/

COPY --from=builder /builds/consumer/dist consumer/dist
COPY consumer/ecosystem.config.json consumer/

EXPOSE 3000 49152
