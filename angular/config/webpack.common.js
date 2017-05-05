const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const extractSass = new ExtractTextPlugin({
    filename: "styles/[name].css"
});

module.exports = {
    entry: {
        polyfills: path.resolve('src/polyfills'),
        vendor: path.resolve('src/vendor'),
        app: path.resolve('src/main')
    },

    resolve: {
        extensions: ['.ts', '.js'],
        modules: [path.resolve('src'), path.resolve('node_modules')]
    },

    module: {
        rules: [{
            test: /\.ts$/,
            exclude: /node_modules/,
            use: [{
                loader: 'ts-loader'
            }, {
                loader: 'angular2-template-loader'
            }]
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            use: [{
                loader: 'babel-loader', options: {
                    passPerPreset: true,
                    presets: ['babel-preset-es2015'],
                    plugins: [
                        'babel-plugin-transform-es2015-destructuring',
                        'babel-plugin-transform-object-rest-spread',
                        'babel-plugin-angular2-annotations',
                        'babel-plugin-transform-class-properties',
                        'babel-plugin-transform-decorators-legacy',
                        'babel-plugin-transform-flow-strip-types'
                    ]
                }
            }, {
                loader: 'angular2-template-loader'
            }]
        }, {
            test: /\.handlebars$/,
            use: 'handlebars-loader'
        }, {
            test: /\.html$/,
            use: 'html-loader'
        }, {
            test: /\.json$/,
            use: 'json-loader'
        }, {
            test: /\.(css|scss)$/,
            exclude: [path.resolve('node_modules')],
            include: [path.resolve('src/styles')],
            use: extractSass.extract({
                use: [{
                    loader: "css-loader"
                }, {
                    loader: "sass-loader"
                }],
                // use style-loader in development
                fallback: "style-loader"
            })
        }, {
            test: /\.(css|scss)$/,
            include: path.resolve('src'),
            exclude: path.resolve('src/styles'),
            use: [{
                loader: 'raw-loader'
            }, {
                loader: 'sass-loader'
            }]
        }]
    },

    plugins: [
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)@angular/,
          path.resolve('doesnotexist/')),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['app', 'vendor', 'polyfills']
        }),
        extractSass,
        new CleanWebpackPlugin(['dist', 'build'], {
        root: path.resolve(''),
        }),
        new ProgressBarPlugin()
    ]
};
