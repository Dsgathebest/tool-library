const puppeteer = require('puppeteer');
const puppeteerExtra = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const proxyChain = require('proxy-chain');
const { Cluster } = require('puppeteer-cluster');
const UserAgent = require('user-agents');
const fs = require('fs');