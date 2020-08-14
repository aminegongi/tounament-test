FROM node:12-slim AS builder

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install
COPY . .
RUN yarn build \
    && mkdir _server && cd _server \
    && mv ../yarn.lock && yarn init -y \
    && yarn add next

RUN ls -al
RUN pwd

FROM node:alpine AS runner

WORKDIR /app

COPY --from=builder /app/build/ build/
COPY --from=builder /app/server/ server/
RUN mv server/node_modules server/package.json ./

ENTRYPOINT [ "yarn", "run", "start" ]
