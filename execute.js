'use strict';

var spawn = require('cross-spawn');
var chalk = require('chalk');

module.exports = function(script, path, args) {
   try {
      var result = spawn.sync('node',
                              [require.resolve(path + '/' + script)].concat(args),
                              {stdio: 'inherit'});

      process.exit(result.status);
    } catch(e) {
      console.log(chalk.red('Unknown script: ' + script));
    }
};
