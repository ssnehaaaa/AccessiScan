#!/usr/bin/env bash

# Step 1: install deps
npm install

# Step 2: create Puppeteer config
mkdir -p ./server/.puppeteer-cache
echo "module.exports = { default: { cacheDirectory: '/opt/render/.cache/puppeteer' } };" > server/puppeteer.config.cjs

# Step 3: install Chromium to that location
npx puppeteer --config server/puppeteer.config.cjs browsers install chrome
