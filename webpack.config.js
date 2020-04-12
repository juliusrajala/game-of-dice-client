const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  entry: './src/App.tsx',
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'ts-loader', exclude: /node_modules/ },
      {
        loader: 'file-loader',
        test: [/\.jpe?g$/, /\.png$/],
        exclude: /node_modules/,
      },
      { test: /\.js$/, use: ['source-map-loader'], enforce: 'pre' },
    ],
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, './src/'),
    },
    extensions: ['.tsx', '.ts', '.js'],
  },
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        api_url: JSON.stringify(process.env.api_url),
      },
    }),
    new HtmlWebpackPlugin({
      title: 'Noppa',
      template: 'public/index.html',
    }),
  ],
};

module.exports = config;
