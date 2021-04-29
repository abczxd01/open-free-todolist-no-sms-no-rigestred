const path = require('path');
const fs = require('fs');

const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const environment = require('./environment');


const templateFiles = fs.readdirSync(environment.paths.source)
  .filter((file) => path.extname(file).toLowerCase() === '.html');
  
const htmlPluginEntries = templateFiles.map((template) => new HTMLWebpackPlugin({
  inject: true,
  hash: false,
  filename: template,
  template: path.resolve(environment.paths.source, template),
}));


const configureBabelLoader = () => {
  return {
    test: /\.js$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
    },
  }
}

const configureOutput = () => {
  return {
    path: environment.paths.output,
    filename: 'assets/js/[name].js',
    assetModuleFilename: 'asset/images/[name].[hash][ext]',
  }
}
console.log(path.resolve(environment.paths.output, 'assets' , 'images'),);
module.exports = {
  resolve:{
    alias:{
      $app:path.resolve(environment.paths.source, 'app'),
      $baseStyle: path.resolve(environment.paths.source, 'base-style'),
      $img: path.resolve(environment.paths.source, 'images'),
      
    }
  },
  entry: {
    main: path.resolve(environment.paths.source, 'app', 'main.js'),
  },

  output: configureOutput(),
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

      // configureBabelLoader(),
    ],
  },
  plugins: [
    ...htmlPluginEntries,
    new CleanWebpackPlugin({
      verbose: true,
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(environment.paths.source, 'images'),
          to: path.resolve(environment.paths.output, 'assets/images' ),
          toType: 'dir',
        },
      ],
    }),
  ]
};



