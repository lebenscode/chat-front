const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');

// config
const ROOT_DIR = __dirname;
const CLIENT_CONFIGS_DIR = path.resolve(ROOT_DIR, './config');

function getJSONConfig() {
    return require(CLIENT_CONFIGS_DIR + '/config');
}

const BUILD_NAME = process.env.BUILD_NAME ? process.env.BUILD_NAME = process.env.BUILD_NAME.trim() : 'build';

const JSON_CONFIG = getJSONConfig();

module.exports = {
    entry: {
        bundle: ['./src/index.js']
    },
    output: {
        path: path.join(ROOT_DIR, '/web/' + BUILD_NAME),
        publicPath: JSON_CONFIG.publicPath,
        filename: '[name].[contenthash].js',
        chunkFilename: '[id].js',
        assetModuleFilename: "media/[hash][ext][query]"
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
    module: {
        rules: [
            {
                test: /\.js(x)?$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', '@babel/react'],
                            plugins: [
                                require('@babel/plugin-syntax-dynamic-import'),
                                require('@babel/plugin-proposal-object-rest-spread'),
                                [require('@babel/plugin-proposal-decorators'), {legacy: true}],
                                [require('@babel/plugin-proposal-class-properties')],
                            ]
                        }
                    }
                ]
            },

            {
                test: /\.svg$/,
                exclude: ['/node_modules'],
                oneOf: [{
                    resourceQuery: /jsx/,
                    use: ['@svgr/webpack'],
                }, {type: 'asset/inline'}],
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.jpe?g$|\.ico$|\.gif$|\.pdf$|\.png$|\.woff$|\.woff2$|\.eot$|\.ttf$|\.wav$|\.mp3$|\.webp$|\.mp4$/,
                type: 'asset/resource',
            }
        ]
    },
    resolve: {
        modules: [
            'src',
            'node_modules'
        ],
        extensions: ['.js', '.jsx'],
        alias: {
            components: ROOT_DIR + '/src/components/',
            containers: ROOT_DIR + '/src/containers/',
            helpers: ROOT_DIR + '/src/helpers/',
            layouts: ROOT_DIR + '/src/layouts/',
            libs: ROOT_DIR + '/src/libs/',
            public: ROOT_DIR + '/src/public/'
        }
    },
    devServer: {
        historyApiFallback: true,
        open: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            APP_CONFIG: JSON_CONFIG,
            headScripts: [
                {
                    content: `(function () {` +
                        `        window.APP_CONFIG = ${JSON.stringify(JSON_CONFIG)}` +
                        `    })()`
                }
            ],
            title: JSON_CONFIG.name
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[fullhash].css",
            chunkFilename: "[id].css"
        }),
        new webpack.DefinePlugin({
            IS_PRODUCTION: process.env.CONFIG_NAME === "prod",
            IS_DEVELOPMENT: process.env.CONFIG_NAME === "dev",
        })
    ]
};
