FROM node:lts-alpine3.20
WORKDIR /backend


RUN apk update
RUN apk upgrade
RUN apk add bash vim nano
RUN npm install -g pnpm

COPY endpoint.sh /
RUN dos2unix /endpoint.sh

CMD ["sh", "/endpoint.sh"]
