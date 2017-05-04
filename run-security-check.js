'use strict';

var spawn = require('cross-spawn');

module.exports = function() {
  return spawn.sync('nsp', ['check'], {stdio: 'inherit'});
};
