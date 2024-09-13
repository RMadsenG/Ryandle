FROM docker.io/nginx:alpine

WORKDIR /usr/share/nginx/html

COPY out .

ENTRYPOINT ["nginx", "-g", "daemon off;"]