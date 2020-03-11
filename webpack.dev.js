const path = require('path')
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
const WebpackModules = require('webpack-modules');
const Merge = require('webpack-merge')
const CommonConfig = require('./webpack.common.js')

module.exports = Merge(CommonConfig, {
    mode: 'development',
    entry: {
        demo: './demo/index.js'
    },
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, 'dev'),
        filename: 'js/[name].bundle.js',
        chunkFilename: 'js/[id].chunk.js'
    },
    plugins: [
        new WebpackModules(),
        new CleanWebpackPlugin()
    ],
    module: {
        rules: [{
            test: /\.css$/i,
            // include: /node_modules/,
            use: [{
                loader: 'style-loader'
            },
            {
                loader: 'css-loader',
                options: {
                    modules: 'global'
                    // modules: true
                }
            }]
        }]
    }
})