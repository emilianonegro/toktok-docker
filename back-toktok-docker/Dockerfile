FROM node:alpine 

WORKDIR /home/node/app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD  npm run dev 
