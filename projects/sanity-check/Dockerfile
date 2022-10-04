FROM node:latest as build
RUN npm i -g @angular/cli
ENV CI=true
RUN ng new frontegg-test --defaults
WORKDIR frontegg-test
RUN npm i @frontegg/angular

