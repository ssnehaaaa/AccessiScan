#!/usr/bin/env bash

# Install deps
npm install

# Ensure puppeteer uses correct cache directory
npx puppeteer --config server/puppeteer.config.cjs browsers install chrome
