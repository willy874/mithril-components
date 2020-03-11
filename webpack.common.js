const path = require('path')


let CommonConfig = {
    optimization: {
        splitChunks: {
            cacheGroups: {
                common: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'commons',
                    enforce: true,
                    chunks: 'all'
                },
                styles: {
                    name: 'vendor',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true
                }
            },
        },
        runtimeChunk: {
            name: 'runtime'
        },
        namedModules: true,
        noEmitOnErrors: true,
        concatenateModules: true,
    },
    resolve: {
        extensions: ['.js', '.json', '.css'],
        alias: {
            '@src': path.resolve(__dirname, 'src/'),
            '@base': path.resolve(__dirname, './src')
        },
        modules: [
            'node_modules'
        ]
    },
    module: {
        rules: [{
            test: /\.(ttf|eot|woff|woff2)$/,
            loader: 'file-loader',
            options: {
                name: '[name].[ext]',
                outputPath: './fonts/',
                publicPath: '/fonts/'
            },
        }, {
            test: /\.(jpe?g|png|gif|webp|svg)$/,
            use: {
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: './images/',
                    publicPath: '/images/'
                }
            }
        }, {
            test: /\.js$/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        }]
    }
}

module.exports = CommonConfig