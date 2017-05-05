'use strict';

const path = require("path");
const chalk = require('chalk');
const webPack = require('../webpackRunner').serve;
const securityCheck = require('../run-security-check');


'use strict';

console.log(chalk.green('Checking npm packages for security vulnerabilities...'));
const securityResults = securityCheck();

if(securityResults.status !== 0) {
  process.exit(securityResults);
}

console.log(chalk.green('\nStarting angular application in dev mode...'));
process.env.NODE_ENV = 'production';
const clientConfig = path.resolve(__dirname, 'config/webpack.dev.js');

webPack(clientConfig);
