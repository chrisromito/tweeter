#!/usr/bin/env bash
# ONLY RUN THIS ONCE
# This builds your database & installs NPM dependencies
cd ./scripts
source ./build_db.sh
cd ../
npm install
