FROM node:16

WORKDIR /usr/src/socialdog-web

COPY . .

RUN npm install

RUN npm run build

EXPOSE 3000