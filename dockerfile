FROM node:20

WORKDIR /usr/src

COPY package*json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "src/index.js"]