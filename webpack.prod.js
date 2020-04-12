const merge = require('webpack-merge');
const common = require('./webpack.config.js');
const webpack = require('webpack');
const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
  },
  optimization: {
    runtimeChunk: 'single',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        api_url: JSON.stringify(process.env.api_url),
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new CompressionPlugin(),
  ],
});
