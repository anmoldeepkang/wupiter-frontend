## Build Stage
FROM node:10.15.3-alpine as build

WORKDIR /app

COPY package*.json /app/

RUN yarn install

COPY ./ /app/
COPY ./.env.production /app/.env

RUN yarn run build

## Runtime Stage
FROM nginx:1.19.7-alpine

COPY --from=build /app/build/ /usr/share/nginx/html
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf

