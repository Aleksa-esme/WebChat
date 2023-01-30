FROM node:16.16.0

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN node --max-old-space-size=4096 `which npm` install

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "start" ]
