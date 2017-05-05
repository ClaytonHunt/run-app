const path = require('path');
const webpackMerge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const commonConfig = require('./webpack.common');

module.exports = webpackMerge(commonConfig, {
    devtool: 'source-map',

    output: {
        path: path.resolve('dist'),
        publicPath: 'http://localhost:9000/',
        filename: '[name].js',
        chunkFilename: '[id].chunk.js'
    },

    module: {
        rules: [{
            test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|otf|ico)(\?\S*)?$/,
            use: {
                loader: 'file-loader',
                options: {
                    outputPath: 'assets/',
                    publicPath: '../assets/'
                }
            },
        }]
    },

    devServer: {
        historyApiFallback: true,
        compress: true,
        stats: 'minimal',
        port: 9000
    },

    plugins: [new HtmlWebpackPlugin({
        template: 'src/html/index.handlebars',
        inject: false
    })]
});
