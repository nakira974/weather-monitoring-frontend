FROM node:16-alpine3.11
RUN apk add nginx
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
RUN npm install -g npm@latest
RUN npm install
COPY . /app
EXPOSE 4200
ENV NODE_ENV production
RUN npm run build

FROM nginx:1.17.1-alpine
COPY --from=build-step /app/docs /usr/share/nginx/html
