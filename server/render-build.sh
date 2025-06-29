#!/usr/bin/env bash

# Install dependencies
npm install

# Use puppeteer CLI from node_modules explicitly
npx --yes puppeteer browsers install chrome
