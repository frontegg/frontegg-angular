FROM node:latest as build
RUN npm i -g @angular/cli
ENV CI=true
RUN ng new frontegg-test --defaults
WORKDIR frontegg-test
RUN npm i @frontegg/angular
COPY app.module.ts ./src/app
COPY app.component.ts ./src/app
COPY app.component.html ./src/app

