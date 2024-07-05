FROM node:lts-alpine3.20
# FROM oven/bun:alpine
WORKDIR /backend


RUN apk update
RUN apk upgrade
RUN apk add bash vim nano
# RUN apk add node
RUN npm install -g pnpm

COPY endpoint.sh /

# CMD ["sleep", "infinity"]
CMD ["sh", "/endpoint.sh"]

#https://pnpm.io/fr/installation
#https://vitejs.dev/guide/
#https://vitest.dev/guide/
#https://socket.io/docs/v3/server-installation/