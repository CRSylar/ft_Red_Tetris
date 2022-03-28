FROM nginx:latest

COPY ./nginx.conf /ect/nginx/conf.d/default.conf

ENTRYPOINT ['/usr/sbin/nginx', '-g', 'daemon off;']

EXPOSE 80
EXPOSE 8080
