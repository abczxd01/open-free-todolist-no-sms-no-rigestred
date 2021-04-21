const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');


const baseConfig = require('./webpack.common.js');

const { cssLoaders } = require('./util');

module.exports = merge(baseConfig,{
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(css|sass|scss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          ...cssLoaders
        ],
      },
    ],
  },
  optimization: {
    minimize: true,
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
  ]
})