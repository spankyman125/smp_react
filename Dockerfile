FROM node:18-alpine3.15
WORKDIR /container
COPY package*.json ./
COPY jsconfig.json ./
RUN npm install
CMD [ "npm", "start" ]
EXPOSE 3000