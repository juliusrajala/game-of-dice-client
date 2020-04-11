const merge = require('webpack-merge');
const common = require('./webpack.config.js');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');

module.exports = merge(common, {
  mode: 'production',
  optimization: {
    minimizer: [
      new TerserPlugin({
        /* additional options here */
      }),
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        api_url: JSON.stringify(process.env.api_url),
        NODE_ENV: JSON.stringify('production'),
      },
    }),
  ],
});
