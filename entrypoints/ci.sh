#!/bin/sh
wait4ports -t 10 "tcp://everglot-db:5432"

npm run migrate up

wait4ports -t 10 "tcp://everglot-app:3000"

exec "$@"
