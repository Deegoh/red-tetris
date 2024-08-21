FROM node:lts-alpine3.16 AS build_front
WORKDIR /frontend

COPY data/frontend .

RUN npm install -g pnpm
RUN pnpm install
RUN pnpm build

#-----------------------------------------

FROM node:lts-alpine3.16
WORKDIR /server

RUN npm install -g pnpm

COPY data/backend .

COPY --from=build_front /frontend/dist /build

RUN pnpm install --prod

CMD ["node", "src/main.js"]


