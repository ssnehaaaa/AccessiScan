#!/usr/bin/env bash

# Install dependencies
npm install

# Install Chromium for Puppeteer using npx
npx --yes puppeteer browsers install chrome
