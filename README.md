# Everglot

Everglot web application based on Express.js, Svelte/Sapper, Socket.io, PostgreSQL and PostGraphile.

## Configuration

If you are going to use `docker-compose`, create an `.env` file in the same directory as this file. Otherwise set the following environment variables through some other means.

```bash
POSTGRES_USER=everglot_app_user
POSTGRES_PASSWORD=everglot_app_pass
POSTGRES_DB=everglot_app_db
SESSION_COOKIE_VALIDATION_SECRETS=["SomeVeryLongRandomSecret"]
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

#### Dependencies

Then install this project's development dependencies locally using

```bash
npm i --also=dev
```

### Database Schema

Before the app is fully operationable, the database schema must be updated by running all missing migrations. Migrations are essentially code describing how the database should be changed.

They are run both in development and production to semi-automatically ensure that your app's database is always up-to-date.

To setup the current database schema, run

```bash
PGHOST=localhost \
PGUSER=everglot_app_user \
PGDATABASE=everglot_app_db \
PGPASSWORD=everglot_app_pass \
    npm run migrate up
```

In development, at least the `everglot-db` container must be running so that there is a Postgres database to connect to.

This command also needs to be run in production as soon as changes requiring a new schema are deployed. Of course respective environment variables need to be set accordingly.

### Adding a database migration

To create a new migration up/down definition file within `src/migrations` run the following command:

```bash
PGHOST=localhost \
PGUSER=everglot_app_user \
PGDATABASE=everglot_app_db \
PGPASSWORD=everglot_app_pass \
    npm run migrate create "this is my migration name"
```

Then change the new file. To run newly created and/or remaining migrations, call the `migrate` npm script with the up command as you did during the initial setup (to load the schema):

```bash
PGHOST=localhost \
PGUSER=everglot_app_user \
PGDATABASE=everglot_app_db \
PGPASSWORD=everglot_app_pass \
    npm run migrate up
```

You can also add a number after it to specify a maximum number of migrations to run. If you made a mistake roll them/it back using `migrate down`:

```bash
PGHOST=localhost \
PGUSER=everglot_app_user \
PGDATABASE=everglot_app_db \
PGPASSWORD=everglot_app_pass \
    npm run migrate down 1
```

Then you can change the migration file and only commit the correct one. But never remove a migration that you ran in production or shared with others. They help us roll back changes and to understand the database schema's history.

### Creating a GraphQL query on the client

Create a `.graphql` file in `src/gql/` containing your GraphQL query/mutation/subscription.

Then generate the typings and any missing persisted operation files using:

```bash
npm run codegen
```

Note: Subscriptions are not configured, yet (2021-03-17).

## Deployment

Deployment is done via Kubernetes (see `k8s-setup` repository).
