FROM node:16.15.0 as Build

WORKDIR /app

COPY package*.json /app/

COPY tsconfig.json /app/

RUN npm i

COPY ./public/ /app/public

COPY ./src/ /app/src

RUN npm run build


FROM nginx
ENV NGINX_PORT=8080
EXPOSE 8080
COPY --from=Build /app/build/ /usr/share/nginx/html