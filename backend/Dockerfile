FROM node:18-alpine

#det working directory
WORKDIR /server

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 8000

CMD ["nodemon", "server.js"]

