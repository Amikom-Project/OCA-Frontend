FROM node:20.9.0-bullseye AS development

WORKDIR /app

COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock

RUN yarn install

COPY . .

CMD [ "yarn", "start" ]

FROM development AS build

RUN yarn build

FROM nginx:1.17.1-alpine

COPY .nginx/nginx.conf /etc/nginx/nginx.conf

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=build /app/dist ./dist

ENTRYPOINT ["nginx", "-g", "daemon off;"]
