#!/usr/bin/env bash
# NOTE: Run this locally to ensure that Production will mimic development
# Documentation: https://www.postgresql.org/docs/10/app-pgdump.html
pg_dump --clean --if-exists --no-owner --column-inserts tweeter > ./migrations/setup.sql
