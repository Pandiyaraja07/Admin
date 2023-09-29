FROM node:18 as builder

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY . ./

RUN npm run prod:build

FROM nginx:alpine

COPY --from=builder /usr/src/app/dist/sgri-web /usr/share/nginx/html/sgri-web

COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

COPY docker-entrypoint.sh /docker-entrypoint.sh

RUN chmod +x /docker-entrypoint.sh

CMD ["sh", "/docker-entrypoint.sh"]
