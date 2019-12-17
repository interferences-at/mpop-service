FROM node:13-alpine

WORKDIR /app

RUN apk --update --no-cache add tzdata bash curl \
    && cp /usr/share/zoneinfo/Canada/Eastern /etc/localtime \
    && echo "Canada/Eastern" > /etc/timezone \
    && apk del tzdata

COPY ./package.json .
COPY ./package-lock.json .
COPY . .
COPY wait-for-it.sh /

RUN npm install

EXPOSE 3000
EXPOSE 18187
EXPOSE 18189

CMD /wait-for-it.sh db:3306 -- npm start

