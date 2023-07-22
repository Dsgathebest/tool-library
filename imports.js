const puppeteer = require('puppeteer-extra');
const { Cluster } = require('puppeteer-cluster');
const fs = require('fs');

const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());