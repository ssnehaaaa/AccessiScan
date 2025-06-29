#!/usr/bin/env bash

# Install dependencies
npm install

# Generate puppeteer config (if needed)
echo "export default { cacheDirectory: '/opt/render/.cache/puppeteer' };" > puppeteer.config.cjs

# Install Chromium browser using Puppeteer
npx --yes puppeteer --config puppeteer.config.cjs browsers install chrome
