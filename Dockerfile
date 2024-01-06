# ----------------------------
# build from source
# ----------------------------
FROM node:20 AS build

WORKDIR /app

COPY package*.json .
RUN npm install

COPY . .
RUN npm run build

# ----------------------------
# run with nginx
# ----------------------------
FROM nginx

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

# Set the environment variable for the Gateway address
ENV GATEWAY_URL http://localhost:8080

COPY --from=build /app/dist/client /usr/share/nginx/html

EXPOSE 80
