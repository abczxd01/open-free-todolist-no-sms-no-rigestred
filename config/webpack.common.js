const path = require('path');
const fs = require('fs');

const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const environment = require('./environment');

const templateFiles = fs
  .readdirSync(environment.paths.source)
  .filter(file => path.extname(file).toLowerCase() === '.html');

const htmlPluginEntries = templateFiles.map(
  template =>
    new HTMLWebpackPlugin({
      inject: true,
      hash: false,
      filename: template,
      template: path.resolve(environment.paths.source, template),
    })
);

module.exports = {
  resolve: {
    alias: {
      $app: path.resolve(environment.paths.source, 'app'),
      $baseStyle: path.resolve(environment.paths.source, 'base-style'),
      $img: path.resolve(environment.paths.source, 'images'),
    },
  },
  entry: {
    main: path.resolve(environment.paths.source, 'app', 'main.js'),
  },
  module: {
    rules: [
      {
        test: /\.(png|gif|jpe?g|svg)$/i,
        type: 'asset',
        generator: {
          filename: 'assets/images/[name].[hash][ext]',
        },
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/,
        type: 'asset/inline',
      },
    ],
  },
  plugins: [
    ...htmlPluginEntries,
    new CleanWebpackPlugin({
      verbose: true,
    }),
  ],
};
