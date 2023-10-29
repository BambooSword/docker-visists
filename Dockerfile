FROM node:alpine

WORKDIR '/app'

RUN --mount=type=cache,target=/root/.npm \
    npm install -g pnpm
# 只有package.josn 有变化时 才执行 pnpm install
COPY package.json .

RUN pnpm install

COPY . .
RUN pnpm compile
CMD pnpm start