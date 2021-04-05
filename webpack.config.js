const path = require('path');
const fs = require('fs');
require('babel-polyfill')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;


const scssLoaders = () => {
    if (isDev) {
        const scssLoadersIsDev = [
            'style-loader',
            {
                loader: 'css-loader',
                options: { sourceMap: true }
            },
            {
                loader: 'sass-loader',
                options: { sourceMap: true }
            }
        ]
        return scssLoadersIsDev
    }
    else if (isProd) {
        const scssLoadersIsProd = [
            {
                loader: MiniCssExtractPlugin.loader,
                options: {
                    publicPath: '',
                    esModule: false
                }
            },
            {
                loader: 'css-loader',
                options: { sourceMap: true }
            },
            {
                loader: 'postcss-loader',
                options: {
                    sourceMap: true,
                    postcssOptions: {
                        config: path.resolve(__dirname, 'postcss.config.js'),
                    }
                }
            },
            {
                loader: 'sass-loader',
                options: { sourceMap: true }
            }
        ]
        return scssLoadersIsProd
    }
}
module.exports = {
    resolve: {
        alias: {
            scss: path.resolve(__dirname, 'src/sass'),
            fonts: path.resolve(__dirname, 'src/fonts'),
            pages: path.resolve(__dirname, 'src/pages'),
            extensions: ['js']

        }
    },
    entry: ["babel-polyfill", "./src/index.js"],
    // entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].[contenthash].js',
    },
    devServer: {
        contentBase: path.join(__dirname,'dist'),
        compress: true,
        port: 9000,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: '/node_modules/'
            },
            {
                test: /\.scss$/,
                use: scssLoaders()
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)$/,
                include: [
                    path.resolve(__dirname, 'src/fonts'),
                ],
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'assets/fonts',
                    },
                },
            },
            {
                test: /\.(png|jpg|jpeg|svg|gif)$/,
                exclude: [
                    path.resolve(__dirname, 'src/fonts'),
                ],
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'assets/images',
                    },
                },
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
          filename: 'style.[contenthash].css',
          chunkFilename: '[id].css',
        }),
        new HtmlWebpackPlugin({
            filename: "planned.html",
            template: "./src/pages/planned/planned.html"
        }),
        new HtmlWebpackPlugin({
            filename: "toDay.html",
            template: "./src/pages/toDay/toDay.html"
        }),
        new CleanWebpackPlugin(),
    ]
};