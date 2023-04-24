FROM node:current-alpine

WORKDIR /app

RUN apk update
RUN apk upgrade
RUN apk add bash vim nano

RUN npm install -g pnpm
RUN pnpm create vite red-tetris --template react
RUN cd red-tetris
#RUN pnpm add -D vitest
#RUN pnpm add socket.io

#  pnpm install
#  pnpm run dev

RUN pnpm install
#CMD ["yarn", "start"]

CMD ["sleep", "infinity"]

#https://pnpm.io/fr/installation
#https://vitejs.dev/guide/
#https://vitest.dev/guide/
#https://socket.io/docs/v3/server-installation/