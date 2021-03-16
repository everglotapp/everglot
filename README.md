# Everglot

Everglot web application based on Express.js, Svelte/Sapper, Socket.io, PostgreSQL and PostGraphile.

## Development

Development works with `docker` and `docker-compose`. Run

```bash
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up
```

to automatically start all required servers, including:

-   PostgreSQL database at `postgres://localhost:5432`
-   Express.js web server at [`http://localhost:8002`](http://localhost:8002)
-   Socket.io chat server at `http://localhost:8002/socket.io/`
-   PostGraphile GraphQL server at `http://localhost:8002/graphql`
    -   GraphiQL IDE at [`http://localhost:8002/graphiql`](http://localhost:8002/graphiql)

Files from this directory are automatically mirrored but you may find yourself needing to restart the app Docker container anyways so that it correctly picks up new files.

### Database Schema

Before the system is operational, the database schema must be updated by running all missing migrations:

```bash
PGHOST=localhost PGUSER=everglot_app_user PGDATABASE=everglot_app_db PGPASSWORD=everglot_app_pass npm run migrate up
```

This command also needs to be run in production, with the respective environment variables.

### Adding a database migration

Run the following command:

```bash
PGHOST=localhost PGUSER=everglot_app_user PGDATABASE=everglot_app_db PGPASSWORD=everglot_app_pass npm run migrate create "this is my migration name"
```

To run the migrations, call the `migrate` npm script with the up command:

```bash
PGHOST=localhost PGUSER=everglot_app_user PGDATABASE=everglot_app_db PGPASSWORD=everglot_app_pass npm run migrate up
```

If you made a mistake roll it back using `migrate down`:

```bash
PGHOST=localhost PGUSER=everglot_app_user PGDATABASE=everglot_app_db PGPASSWORD=everglot_app_pass npm run migrate down 1
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
