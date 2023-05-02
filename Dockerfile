FROM node:14-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

FROM nginx:1.21-alpine
COPY --from=build /app/dist/keycloak-frontend /usr/share/nginx/html
COPY src/nginx.conf /etc/nginx/conf.d/default.conf
COPY certs/cert.pem /etc/nginx/cert.pem
COPY certs/privkey.pem /etc/nginx/key.pem


EXPOSE 4200

CMD ["nginx", "-g", "daemon off;"]
