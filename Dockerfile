FROM node:16

WORKDIR /

COPY . .

RUN node install

EXPOSE 5000

CMD ["ts-node", "server.ts"]