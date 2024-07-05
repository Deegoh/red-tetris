FROM node:lts-alpine3.20
WORKDIR /frontend

RUN apk update
RUN apk upgrade
RUN apk add bash vim nano
RUN npm install -g pnpm

COPY endpoint.sh /

CMD ["sh", "/endpoint.sh"]

#https://pnpm.io/fr/installation
#https://vitejs.dev/guide/
#https://vitest.dev/guide/
#https://socket.io/docs/v3/server-installation/