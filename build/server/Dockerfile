FROM node:lts-alpine3.20
# WORKDIR /server

COPY endpoint.sh /
COPY vite.config.js /

RUN apk update
RUN apk upgrade
RUN apk add bash vim nano
RUN npm install -g pnpm

EXPOSE 8081
EXPOSE 3000

# CMD ["sleep", "infinity"]
CMD ["sh", "/endpoint.sh"]

#https://pnpm.io/fr/installation
#https://vitejs.dev/guide/
#https://vitest.dev/guide/
#https://socket.io/docs/v3/server-installation/