import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import consumeArticles from "./blog/engine";
import fs from 'fs';

const articles = consumeArticles(path.resolve(__dirname, "blog/articles"));

const config: webpack.Configuration = {
    entry: './src/personal/index.ts',

    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    chunks: 'all',
                    minChunks: 3,
                    minSize: 0,
                    name: 'common'
                }
            }
        },
    },
    module: {
        rules: [
            /*{
                test: /\.pug$/,
                use: [
                    'debug-loader',
                    {
                        loader: 'file-loader',
                        options: {
                            name: "[contenthash].html"
                        }
                    },
                    'debug-loader',
                    'apply-loader',
                    'debug-loader',
                    'pug-loader'
                ]
            },*/
            {
                test: /index.pug/,
                use: {
                    loader: 'pug-loader',
                    options: {}
                }
            },
            {
                test: /\.ts$/,
                use: [
                    'apply-loader',
                    'ts-loader'
                ]
            },
            {
                test: /\.png$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false
                        }
                    }
                ]
            },

            {
                test: /\.s[ac]ss$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[hash].css',
                            esModule: false
                        }
                    },
                    'extract-loader',
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            sassOptions: {
                                includePaths: [
                                    './node_modules'
                                ]
                            }
                        }
                    }
                ]
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'foo.bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: "./src/personal/index.pug",
            articles: articles
        })
    ]

};

export default config;