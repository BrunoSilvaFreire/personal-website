import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractCssChunks from "extract-css-chunks-webpack-plugin";

export default {
    entry: './app/src/index.ts',
    module: {
        rules: [
            {
                test: /\.pug$/,
                use: [
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
                test: /\.(png|jpg|gif)$/i,
                generator: {
                    filename: 'static/[name][ext]'
                },
                type: 'asset'
            },
            {
                test: /\.scss$/,
                use: [
                    ExtractCssChunks.loader,
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: "resolve-url-loader"
                    },

                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                ]
            },
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'website.js'
    },
    plugins: [new ExtractCssChunks(),

        new HtmlWebpackPlugin({
                inject: true,
                template: "./app/index.pug",
            },
        )
    ]
};