# pnpm create vite frontend --template react

# cd frontend

# pnpm add socket.io
# pnpm add -D vitest
# pnpm add @reduxjs/toolkit react-redux
# pnpm add -D tailwindcss postcss autoprefixer
# pnpm tailwindcss init -p

# cp /vite.config.js .

pnpm install

if [ "$NODE_ENV" = "development" ];
then
    pnpm run dev
fi
