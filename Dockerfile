from node:lts-alpine

# Install Yarn.
# Necessary as of 2021-03-21 only to run the git-based NPM dependency deep-email-validator.
# We need to use a PR directly as it's not merged yet.
# Therefore it also runs all build scripts including one that calls Yarn.
# TODO: Remove this when deep-email-validator can be installed without Yarn & tsc (typescript is in dev deps).
RUN set -eux \
    & apk add --no-cache \
    	nodejs \
        yarn \
        git \
        wait4ports \
        --repository=http://dl-cdn.alpinelinux.org/alpine/edge/community

# Pass NODE_ENV as a build arg to change the NPM dependencies.
# If NODE_ENV is development the image will also include dev dependencies.
#ARG NODE_ENV=production
# TODO: Default production instead (as soon as we can install prod dependencies without dev dependencies).
ARG NODE_ENV=development
ENV NODE_ENV=$NODE_ENV

RUN echo "$NODE_ENV"

RUN set -eux\
    & [ "$NODE_ENV" != "development" ] || \
        (npm i -g @roarr/cli)

# Restrict app privileges.
USER node
RUN mkdir -p /home/node/app
WORKDIR /home/node/app

# Configure project dependencies.
COPY --chown=node:node package*.json ./

# NOTE: We should not be installing npm dependencies via git if possible.
# The followng two "git config"s are only necessary because we need a version of
# "deep-email-validator" that is currently on GitHub but not on npm (2021-04-13).

# Make sure GitHub is accessed via https.
RUN git config --global url."https://github.com/".insteadOf git@github.com:
# Make sure https is always used for git repositories instead of ssh.
RUN git config --global url."https://".insteadOf ssh://

# Install all dev dependencies to build the app.
RUN NODE_ENV=development npm ci

# Copy latest source code files.
COPY --chown=node:node . .

# Build the app including assets etc.
RUN npm run build

# Re-install without dev dependencies if not in development.
#RUN set -eux \
#    & [ "$NODE_ENV" = "development" ] || \
#        (rm -rf node_modules/ && \
#            npm ci)

EXPOSE 3000
CMD [ "npm", "start" ]
