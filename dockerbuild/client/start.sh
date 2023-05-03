
pnpm config set store-dir /root/.pnpm-store

# yarn tailwindcss init -p

# yarn create react-app ./ --template typescript
# yarn add react-router-dom
# yarn add axios
# yarn add tailwindcss postcss autoprefixer classnames
# yarn add react-icons
# yarn add --dev prettier prettier-plugin-tailwindcss
# yarn add jwt-decode
# yarn add randomstring
# yarn add bcrypt

# # For testing auth module
# yarn add --dev bootstrap




# pnpm create vite


# Download node_modules
pnpm i


if [ "$BUILD_TYPE" = "Production" ];
then
    # # For start in prod
    # yarn vbuild
    # # yarn global add serve

    # # yarn build
    # # serve -s build
    pnpm build

else
    pnpm dev
    # # yarn prettier
    # # yarn start
    # yarn watch
fi

sleep infinity

