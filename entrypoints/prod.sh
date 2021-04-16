#!/bin/sh

wait4ports -t 10 "tcp://everglot-db:5432"

exec "$@"
