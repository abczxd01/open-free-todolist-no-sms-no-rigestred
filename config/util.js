const path = require('path');
const environment = require('./environment');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports.configureCssLoaders = prod => {
  const loaders = [];
  if (prod) {
    loaders.push({
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          config: path.resolve(__dirname, 'postcss.config.js'),
        },
      },
    });
  }
  loaders.push({
    loader: 'sass-loader',
    options: {
      sourceMap: true,
    },
  });
  return [
    {
      test: /\.(css|sass|scss)$/,
      use: [
        {
          loader: prod ? MiniCssExtractPlugin.loader : 'style-loader',
        },
        {
          loader: 'css-loader',
          options: {
            sourceMap: true,
            importLoaders: 2,
          },
        },
        ...loaders,
      ],
    },
  ];
};

module.exports.configureOutput = prod => {
  return {
    path: prod ? environment.paths.outputProd : environment.paths.output,
    filename: 'assets/js/[name].[hash].js',
    assetModuleFilename: 'asset/images/[name].[hash][ext]',
  };
};

module.exports.configureCopyWebpackPlugin = prod => {
  const toCopyImages = path.resolve(
    prod ? environment.paths.outputProd : environment.paths.output,
    'assets/images'
  );
  const toCopyPublic = path.resolve(
    prod ? environment.paths.outputProd : environment.paths.output,
    'assets/public'
  );
  return new CopyWebpackPlugin({
    patterns: [
      {
        from: path.resolve(environment.paths.source, 'images'),
        to: toCopyImages,
        toType: 'dir',
      },
      {
        from: path.resolve(environment.paths.source, 'public'),
        to: toCopyPublic,
        toType: 'dir',
      },
    ],
  });
};
