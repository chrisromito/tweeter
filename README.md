# Tweeter - A Twitter clone

## Overview
This assumes that you have PostgreSQL running, and want to use a database named 'tweeter'. 

To change the database name, update the .env file, and make sure you change the database
name in `scripts/migrations/setup.sql`

## Requirements
- Node + NPM
- PostgreSQL

## Build the DB + install dependencies
`source ./build.sh`

## Run the server
`source ./run.sh`


## Source
See `client/src/` for client-side source code.

See `server/src/` for server-side source code.

