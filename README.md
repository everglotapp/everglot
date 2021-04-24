# Everglot

Everglot web application based on Express.js, Svelte/Sapper, Socket.io, PostgreSQL and PostGraphile.

## Configuration

If you are going to use `docker-compose` (highly recommended), create a file called `.env` in the same directory as this readme. Otherwise set the following environment variables through some other means.

```bash
POSTGRES_USER=everglot_app_user
POSTGRES_PASSWORD=everglot_app_pass
POSTGRES_DB=everglot_app_db
SESSION_COOKIE_VALIDATION_SECRETS=["SomeVeryLongRandomSecret123"]
```

In development you should keep the first three variables as they are. Definitely change the cookie validation secret(s).

## Development

Development works easiest with `docker` and `docker-compose`. Run

```bash
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up
```

to automatically start all required servers, including:

-   PostgreSQL database at `postgres://localhost:5432`
-   Express.js web server at [`http://localhost:8002`](http://localhost:8002)
-   Socket.io chat server at `http://localhost:8002/socket.io/`
-   PostGraphile GraphQL server at `http://localhost:8002/graphql`
    -   GraphiQL IDE at [`http://localhost:8002/graphiql`](http://localhost:8002/graphiql)

Files from this directory are automatically mirrored. Sometimes you may find yourself needing to restart the app Docker container (re-run the above command), for example

-   when adding new files to the server (`src/server` directory)
-   when adding new NPM dependencies.

### Node.js

You will likely want to run NPM commands outside of the containers. Install Node.js [through your package manager](https://nodejs.org/en/download/package-manager/) or with NVM (Node version manager).

### Dependencies

Then install this project's development dependencies locally using

```bash
npm i --also=dev
```

It is also highly recommended you install the Roarr CLI globally so that you can prettify log outputs when necessary. This is done by default within our Docker images for development and testing but you may want this if you interact with production servers.

```bash
npm i -g @roarr/cli
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

Create a `.graphql` file in `src/gql/` containing your GraphQL query/mutation/subscription.

Then generate the typings and any missing persisted operation files using:

```bash
npm run codegen
```

Note: PostGraphile Subscriptions are not configured, yet (2021-03-17).

## Testing

The `docker-compose.test.yml` configuration is designed for running the application tests locally, whereas `docker-compose.ci.yml` is for running them in CI environments.

### Local execution

It is important that you run commands regarding the testing environment in a different `docker-compose` project with the `-p` flag. That way your development containers for the app and for the database are not re-used for testing. The tests delete and add data to your database which you probably do not want during development.

### Unit tests only

To only run unit tests there is no need to run the server itself, execute the following command. It will automatically start the database if it's not up, yet.

```bash
docker-compose \
    -f docker-compose.yml \
    -f docker-compose.test.yml \
    -p test \
    run --entrypoint entrypoints/test-after-db.sh --rm everglot-app \
    npx jest --forceExit src/__tests__/unit
```

To run tests against a running app it must be started in a separate container as well. The following command does that and will also wait for the database to be up.

The created app container will run the app in development mode and thus pick up any changes you make to (existing) files without you having to restart the server manually. Because it has to compile everything initially, you will have to wait about a minute for it to load up.

```bash
docker-compose \
    -f docker-compose.yml \
    -f docker-compose.test.yml \
    -p test \
    up -d everglot-app
```

### All tests

To simply run all tests, execute the following command. Containers created this way will automatically wait a minute for the app to be up in case it's not reachable, yet.

```bash
docker-compose \
    -f docker-compose.yml \
    -f docker-compose.test.yml \
    -p test \
    run --rm everglot-app-test \
    npm run test:pretty
```

### Functional tests only

To run only functional tests:

```bash
docker-compose \
    -f docker-compose.yml \
    -f docker-compose.test.yml \
    -p test \
    run --rm everglot-app-test \
    npx jest --forceExit src/__tests__/functional | roarr pretty-print --
```

Jest's `--forceExit` option (as defined in the `test` script within `package.json`) is currently necessary because something is still running somewhere which prevents the tests from exiting normally within 1 second.

### In CI

CI environments don't need a separate project and should use the `docker-compose.ci.yml` configuration with `entrypoints/wait-for-db.sh` for setup and `entrypoints/wait-for-app.sh` for testing.

```bash
docker-compose \
    -f docker-compose.yml \
    -f docker-compose.ci.yml \
    up -d everglot-db
docker-compose \
    -f docker-compose.yml \
    -f docker-compose.ci.yml \
    run -d --entrypoint entrypoints/wait-for-db.sh everglot-app
docker-compose \
    -f docker-compose.yml \
    -f docker-compose.ci.yml \
    run --entrypoint entrypoints/wait-for-app.sh everglot-app npm run test:pretty
```

## Deployment

Deployment is done via Kubernetes (see `k8s-setup` repository).
