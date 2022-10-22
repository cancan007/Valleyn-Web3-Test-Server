FROM node:16.14.0

RUN npm i -g @nestjs/cli

WORKDIR /valleyn-web3-test-server

COPY package.json package-lock.json ./
RUN npm install

COPY . .

EXPOSE 8081
CMD ["npm", "run", "start:dev"]