#!/usr/bin/env bash
# This script installs Chromium for Puppeteer on Render

# Install dependencies
npm install

# Make puppeteer executable
chmod +x ./node_modules/.bin/puppeteer

# Install Chromium
npx puppeteer --yes browsers install chrome
