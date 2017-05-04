#!/usr/bin/env node
'use strict';

const execute = require('../execute');
const path = require('path');

const script = process.argv[2];
const args = process.argv.slice(3);
const directory = path.resolve(__dirname, '../angular');

execute(script, directory, args);
