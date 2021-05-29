const { merge } = require('webpack-merge');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const baseConfig = require('./webpack.common.js');

const {
  configureCssLoaders,
  configureOutput,
  configureCopyWebpackPlugin,
} = require('./util');

module.exports = merge(baseConfig, {
  output: configureOutput(true),
  mode: 'production',
  module: {
    rules: configureCssLoaders(true),
  },
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: 'all',
    },
    minimizer: [
      new TerserPlugin({
        parallel: true,
      }),
      new CssMinimizerPlugin(),
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'assets/css/[name].[fullhash].css',
      chunkFilename: 'assets/css/[name].[fullhash].css',
    }),
    configureCopyWebpackPlugin(true),
  ],
});
