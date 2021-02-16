#!/bin/bash
npx ./node_modules/typeorm/cli.js "migration:run"
yarn dev:server