# pnpm create vite frontend --template react

# cd frontend

# pnpm add socket.io
# pnpm add -D vitest

# cp /vite.config.js .

pnpm install

if [ "$NODE_ENV" = "development" ];
then
    pnpm run dev
fi

if [ "$NODE_ENV" = "production" ];
then
    pnpm run preview
fi