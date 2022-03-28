FROM nginx:latest

RUN  rm /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /tmp

RUN mv /tmp/nginx.conf /etc/nginx/conf.d/default.conf

ENTRYPOINT ["/usr/sbin/nginx", "-g", "daemon off;"]

EXPOSE 80
EXPOSE 8080
