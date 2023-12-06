FROM node:20

WORKDIR /app

ARG PUBLIC_BACKEND_URI="https://amp.test.axelzublena.com/api/"

COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . ./
RUN npm run build

EXPOSE 3000 

CMD [ "node", "build" ] 