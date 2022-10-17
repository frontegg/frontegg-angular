FROM node:lts-alpine as build
RUN apk add chromium
ENV CHROME_BIN=/usr/bin/chromium-browser
RUN npm i -g @angular/cli
ENV CI=true
RUN ng new frontegg-test --defaults
WORKDIR frontegg-test
RUN npm i @frontegg/angular
COPY app.module.ts ./src/app
COPY app.component.ts ./src/app
COPY app.component.spec.ts ./src/app
COPY app.component.html ./src/app
COPY karma.conf.js ./

