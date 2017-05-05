const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const commonConfig = require('./webpack.common');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';
const CDN_PATH = process.env.CDN_PATH = '${cdn_path}';
const BASE_PATH = process.env.BASE_PATH = '${base_path}';

module.exports = webpackMerge(commonConfig, {
    output: {
        path: path.resolve('dist'),
        publicPath: '/',
        filename: 'scripts/[name].js',
        chunkFilename: 'scripts/[id].chunk.js',
        library: '[name]',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },

    module: {
        rules: [{
            test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|otf|ico)\??.*]?$/,
            use: {
                loader: 'file-loader',
                options: {
                    name: 'assets/[name].[ext]',
                    publicPath: '../'
                }
            }
        }, {
            test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|otf|ico)$/,
            use: {
                loader: 'file-loader',
                options: {
                    name: 'assets/[name].[ext]',
                    publicPath: '../'
                }
            }
        }]
    },

    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new HtmlWebpackPlugin({
            template: 'src/html/header.template.handlebars',
            filename: 'html/header.template.html',
            cdnPath: CDN_PATH,
            basePath: BASE_PATH,
            inject: false
        }), new HtmlWebpackPlugin({
            template: 'src/html/body.template.handlebars',
            filename: 'html/body.template.html',
            cdnPath: CDN_PATH,
            basePath: BASE_PATH,
            inject: false
        }), new HtmlWebpackPlugin({
            template: 'src/html/footer.template.handlebars',
            filename: 'html/footer.template.html',
            cdnPath: CDN_PATH,
            basePath: BASE_PATH,
            inject: false
        }), new HtmlWebpackPlugin({
            template: 'src/html/index.handlebars',
            filename: 'index.html',
            cdnPath: CDN_PATH,
            basePath: BASE_PATH,
            inject: false
        }), new webpack.DefinePlugin({
            'process.env': {
                'ENV': JSON.stringify(ENV),
                'CDN_PATH': JSON.stringify(CDN_PATH),
                'BASE_PATH': JSON.stringify(BASE_PATH)
            }
        })]
});
