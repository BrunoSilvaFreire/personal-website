import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

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
            {
                test: /\.pug$/,
                use: [
                    /*{
                        loader: 'file-loader',
                        options: {
                            name: "index.[contenthash].html"
                        }
                    },
                    'debug-loader',
                    'val-loader',
                    'apply-loader',*/
                    'pug-loader'
                ]
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
                loader: [{
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
        })
    ]

};

export default config;