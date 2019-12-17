FROM node:13

WORKDIR /app

COPY ./package.json .
COPY ./package-lock.json .

RUN npm install

COPY . .

EXPOSE 3000
EXPOSE 18187
EXPOSE 18189

CMD npm start
