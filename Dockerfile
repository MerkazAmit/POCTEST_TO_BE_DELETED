FROM node:16.15.0 as Build

WORKDIR /app

COPY package*.json /app/

COPY tsconfig.json /app/

RUN npm i

COPY ./public/ /app/public

COPY ./src/ /app/src

RUN npm run build


FROM gideonmax/static-server
COPY --from=Build /app/build/ /app/content/