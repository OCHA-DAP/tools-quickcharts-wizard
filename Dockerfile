FROM alpine:3.6 AS builder

ENV NPM_CONFIG_PROGRESS=false \
    NPM_CONFIG_SPIN=false

RUN apk add --update-cache \
        nodejs \
        nodejs-npm \
        git \
        curl \
        nano && \
    git clone https://github.com/OCHA-DAP/tools-wizard.git /srv/wizard && \
    cd /srv/wizard && \
    npm install -g @angular/cli && \
    npm install && \
    ng build --prod -bh /wizard/

FROM alpine:3.6

RUN apk add --update nginx && \
    mkdir -p /run/nginx

COPY ./env/etc/nginx/conf.d/default.conf /etc/nginx/conf.d/
COPY --from=builder /srv/wizard/dist /var/www

ENTRYPOINT ["nginx", "-g", "daemon off;"]
