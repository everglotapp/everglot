# Everglot

Everglot web application based on Express.js, Svelte/Sapper, Socket.io, PostgreSQL and PostGraphile.

## Configuration

Copy `.env.example` to `.env` in the same directory as this readme. Replace every value that says TODO by specific values:

-   For `SESSION_COOKIE_VALIDATION_SECRETS` you typically want an array containing a single random string.
-   For refresh tokens to work you need to set up a private and a public key which you can generate using `node scripts/generateKeyPair.mjs`

In development you should keep the first three variables as they are.

Definitely change the cookie validation secret(s) and the refresh token EdDSA secret key and the JSON Web Key set (JWKS) containing all valid public keys (this is to enable rotation of secret keys while retaining their validity for token verification).

You can generate a keypair for JSON Web Tokens by running `node scripts/generateKeyPair.mjs`.

## Development

### Database

Run

```
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d everglot-db
```

to start (and automatically initialize) the PostgreSQL database at `postgres://localhost:5432`

### Node.js

You will likely want to run NPM commands outside of the containers. Install Node.js [through your package manager](https://nodejs.org/en/download/package-manager/) or with NVM (Node version manager).

Run

```bash
npm run dev
```

to automatically start all required servers, including:

-   Express.js web server at [`http://localhost:8002`](http://localhost:8002)
-   Socket.io chat server at `http://localhost:8002/socket.io/`
-   PostGraphile GraphQL server at `http://localhost:8002/graphql`
    -   GraphiQL IDE at [`http://localhost:8002/graphiql`](http://localhost:8002/graphiql)

Files from this directory are automatically mirrored. Sometimes you may find yourself needing to restart the app (re-run the `npm` command), for example

-   when adding new files to the server (`src/server` directory)
-   when adding new NPM dependencies.

### Dependencies

Then install this project's development dependencies locally using

```bash
npm i --also=dev
```

It is also highly recommended you install the Roarr CLI globally so that you can prettify log outputs when necessary. This is done by default within our Docker images for development and testing but you may want this if you interact with production servers.

```bash
sudo npm i -g @roarr/cli
```

### Database Schema

Before the app is fully operationable, the database schema must be updated by running all missing migrations. Migrations are essentially code describing how the database should be changed.

They are run both in development and production to semi-automatically ensure that your app's database is always up-to-date.

Export the following environment variables, preferably set up aliases for your shell to make your life easier.

```bash
export PGHOST=localhost PGUSER=everglot_app_user PGDATABASE=everglot_app_db PGPASSWORD=everglot_app_pass
```

To setup the current database schema, run

```bash
npm run migrate up
```

In development, at least the `everglot-db` container must be running so that there is a Postgres database to connect to.

This command also needs to be run in production as soon as changes requiring a new schema are deployed. Of course respective environment variables need to be set accordingly.

### Adding a database migration

To create a new migration up/down definition file within `src/migrations` run the following command:

```bash
npm run migrate create "this is my migration name"
```

Then change the new file. To run newly created and/or remaining [`node-pg-migrate`](https://salsita.github.io/node-pg-migrate/) migrations, call the `migrate` npm script with the `up` command just as you did during the initial setup when you set up the schema locally for the first time.

```bash
npm run migrate up
```

Note that you can also add a number after `up`, `down` and `redo` to specify a maximum number of migrations to run. If you made a mistake roll back the faulty migrations using `migrate down`. You just have to make sure the `down` function reverts the wrong changes before you do so.

```bash
npm run migrate down 1
```

Then you can change the migration file and only commit the correct one. But never remove a migration that you ran in production or shared with others. They help us roll back changes and to understand the database schema's history.

### Creating a GraphQL query on the client

Create a `.graphql` file in the `src/gql/` directory containing your GraphQL operation.

Then generate the typings and any missing persisted operation files using:

```bash
npm run codegen
```

Note: PostGraphile Subscriptions are not configured, yet (2021-03-17).

## Testing

The [`docker-compose.test.yml`](docker-compose.test.yml) configuration is designed for running the application tests locally, whereas [`docker-compose.ci.yml`](docker-compose.ci.yml) is for running them in CI environments.

### Local execution

It is important that you run commands regarding the testing environment in a different `docker-compose` project with the `-p` flag. That way your development containers for the app and for the database are not re-used for testing. The tests delete and add data to your database which you probably do not want during development.

### Unit tests only

To only run unit tests there is no need to start the app server itself, just execute the following command. It will automatically start the test database if it's not up, yet.

> In VSCode you can simply press Ctrl+P and enter `task unit-tests`.

```bash
docker-compose \
    -f docker-compose.yml \
    -f docker-compose.test.yml \
    -p test \
    run --entrypoint entrypoints/test-after-db.sh --rm everglot-app \
    mispipe "npm run test -- src/__tests__/unit" "npx roarr pretty-print --filter 'context.logLevel:>20'"
```

> Note: You can increase the output verbosity by filtering the "context.logLevel" property by e.g. `>10` or `>0`.

To run tests against a running app it must be started in a separate container as well. The following command does that and will also wait for the database to be up.

The created app container will run the app in development mode and thus pick up any changes you make to (existing) files without you having to restart the server manually. Because it has to compile everything initially, you will have to wait about a minute for it to load up.

> **Skip this:** You can happily skip this command as it will be run automatically. We only mention it for completeness' sake. It might be useful for initializing your development environment automatically so that you won't have to wait when you need it.

```bash
docker-compose \
    -f docker-compose.yml \
    -f docker-compose.test.yml \
    -p test \
    up -d everglot-app
```

### All tests

To simply run all tests, execute the following command. Containers created this way will automatically wait 100 seconds for the web server to start in case it's not reachable, yet.

> In VSCode you can simply press Ctrl+P and enter `task tests`.

```bash
docker-compose \
    -f docker-compose.yml \
    -f docker-compose.test.yml \
    -p test \
    run --rm everglot-app-test \
    npm run test:pretty -- --filter 'context.logLevel:>20''
```

### Functional tests only

> In VSCode you can simply press Ctrl+P and enter `task functional-tests`.

To run only functional tests:

```bash
docker-compose \
    -f docker-compose.yml \
    -f docker-compose.test.yml \
    -p test \
    run --rm everglot-app-test \
    mispipe "npm run test -- src/__tests__/functional" "npx roarr pretty-print --filter 'context.logLevel:>20''"
```

> Side note: Jest's `--forceExit` option (as defined in the `test` script within `package.json`) is currently necessary because something is still running somewhere which prevents the tests from exiting normally within 1 second. `--runInBand` causes tests to be run sequentially, preventing some race conditions w.r.t. database setup and teardown.

### In CI

CI environments don't need a separate project and should use the `docker-compose.ci.yml` configuration with `entrypoints/wait-for-db.sh` for setup and `entrypoints/wait-for-app.sh` for testing.

See [the GitHub workflow file](.github/workflows/workflow.yaml) for current details.

## Deployment

Deployment is done via Kubernetes (see [`k8s-setup`](https://github.com/everglotapp/k8s-setup) repository).
