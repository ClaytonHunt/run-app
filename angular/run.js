'use strict';

var chalk = require('chalk');
var securityCheck = require('../run-security-check');

'use strict';

console.log(chalk.green('Checking npm packages for security vulnerabilities...'));
var securityResults = securityCheck();

if(securityResults.status !== 0) {
  process.exit(securityResults);
}

console.log(chalk.green('\nStarting angular application in dev mode...'));
