from node:alpine

# Install Yarn.
# Necessary as of 2021-03-21 only to run the git-based NPM dependency deep-email-validator.
# We need to use a PR directly as it's not merged yet, therefore it also runs all build scripts including one that calls Yarn.
RUN set -eux \
    & apk add --no-cache \
    	nodejs \
	yarn \
	--repository=http://dl-cdn.alpinelinux.org/alpine/edge/community

# Restrict app privileges.
USER node
RUN mkdir -p /home/node/app
WORKDIR /home/node/app

# Pass NODE_ENV as a build arg to change the NPM dependencies.
# If NODE_ENV is development the image will also include dev dependencies.
ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

COPY --chown=node:node package*.json ./

# Install all dev dependencies to build the app.
RUN NODE_ENV=development npm ci

# Copy latest source code files.
COPY --chown=node:node . .

# Build the app including assets etc.
RUN npm run build

# Re-install without dev dependencies if not in development.
RUN set -eux \
    & [ "$NODE_ENV" = "development" ] || \
        (rm -rf node_modules/ && \
            npm ci)

EXPOSE 3000
CMD [ "node", "__sapper__/build" ]
