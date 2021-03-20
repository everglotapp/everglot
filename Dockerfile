from node:alpine

RUN set -eux \
    & apk add --no-cache \
    	nodejs \
	yarn \
	--repository=http://dl-cdn.alpinelinux.org/alpine/edge/community

USER node
RUN mkdir -p /home/node/app
WORKDIR /home/node/app

ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

COPY --chown=node:node package*.json ./

RUN npm ci

COPY --chown=node:node . .

RUN npm run build

EXPOSE 3000
CMD [ "node", "__sapper__/build" ]
