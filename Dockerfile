FROM node:16.15.0 as Build

WORKDIR /app

COPY package*.json /app/

RUN npm i

COPY tsconfig.json /app/

COPY ./public/ /app/public

COPY ./src/ /app/src

RUN npm run build

# my own image, I built it to have as few problems as possible when running on openshift
FROM gideonmax/static-server
COPY --from=Build /app/build/ /app/content/