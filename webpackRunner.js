'use strict';

const webpack = require('webpack');
const spawn = require('cross-spawn');
const filesize = require('filesize');
const open = require('open');
const fs = require('fs');
const path = require('path');
const gzipSize = require('gzip-size').sync;
const chalk = require('chalk');

function printFileSizes(stats, config) {
  const outputPath = config.output.path;
  const assets = stats.toJson().assets.map(asset => {
    const fileContents = fs.readFileSync(path.join(outputPath, asset.name));
    const size = gzipSize(fileContents);
    return {
      name: path.basename(asset.name),
      size: size,
      sizeLabel: filesize(size),
    };
  });

  assets.sort((a, b) => b.size - a.size);

  const longestSizeLabelLength = Math.max.apply(
    null,
    assets.map(a => a.sizeLabel.length)
  );

  assets.forEach(asset => {
    let sizeLabel = asset.sizeLabel;
    const sizeLength = sizeLabel.length;
    const dirname = path.relative('', outputPath);

    if (sizeLength < longestSizeLabelLength) {
      sizeLabel += ' '.repeat(longestSizeLabelLength - sizeLength);
    }

    console.log(
      '  ' + sizeLabel +
      '  ' + chalk.dim(dirname + path.sep) + chalk.cyan(asset.name)
    );
  });
}

function handler(config, err, stats) {
  if (err) {
    console.error(err.message || err);
    process.exit(1);
  }

  if (stats.hasErrors()) {
    console.log(stats.toString('errors-only'));
  } else {
    printFileSizes(stats, config);
  }
}

module.exports = {
  build: function (clientConfig) {
    console.log('Building optimized assets...');
    webpack(clientConfig).run((err, stats) => {
      handler(clientConfig, err, stats);
    });
  },
  serve: function (clientConfig) {
    const server = spawn.sync(
      'webpack-dev-server',
      [
        "--config",
        clientConfig,
        '--inline',
        '--hot',
        '--open'
      ],
      {stdio: 'inherit'});

    process.exit(server.status);
  }
};
