#!/usr/bin/env bash
# This scripts assume you're executing this from the 'scripts'
# directory
cd migrations
psql -f setup.sql
cd ../
