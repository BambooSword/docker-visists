FROM node:alpine

WORKDIR '/app'

RUN --mount=type=cache,target=/root/.npm \
    npm install -g pnpm

COPY package.json .



RUN pnpm install

COPY . .

CMD pnpm compile && pnpm start