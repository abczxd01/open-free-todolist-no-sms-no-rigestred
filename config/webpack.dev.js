const webpack = require('webpack');
const { merge } = require('webpack-merge');

const baseConfig = require('./webpack.common.js');
const environment = require('./environment');

const {
  configureOutput,
  configureCssLoaders,
  configureCopyWebpackPlugin,
} = require('./util');
const path = require('path');

const util = require('./util');
const configureDevServer = () => {
  return {
    contentBase: environment.paths.output,
    watchContentBase: true,
    publicPath: '/',
    open: true,
    historyApiFallback: true,
    compress: true,
    overlay: true,
    hot: false,
    watchOptions: {
      poll: 300,
    },
    ...environment.server,
  };
};
module.exports = merge(baseConfig, {
  output: configureOutput(false),
  devtool: 'eval-source-map',

  mode: 'development',

  watchOptions: {
    aggregateTimeout: 300,
    poll: 300,
    ignored: /node_modules/,
  },

  target: 'web',
  devServer: configureDevServer(),
  module: {
    rules: configureCssLoaders(false),
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    configureCopyWebpackPlugin(),
  ],
});
