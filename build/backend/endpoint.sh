
# pnpm create vite server --template react

# cd server

# pnpm add -D vitest
# pnpm add socket.io

# cp /vite.config.js .
# ENV SHELL=sh
# pnpm setup

pnpm install
# pnpm install -g bun 

if [ "$NODE_ENV" = "development" ];
then
    pnpm run dev
fi

# if [ "$NODE_ENV" = "production" ];
# then
#     pnpm run preview
# fi