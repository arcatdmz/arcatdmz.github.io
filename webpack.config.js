const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: [
    './src/javascripts/index.js'
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'javascripts/index.js',
    chunkFilename: 'javascripts/[hash].js'
  },

  devtool: 'source-map',

  module: {
    rules: [
      {
        include: [
          path.resolve(__dirname, 'src'),
        ],
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            'presets': [
              ['@babel/preset-env', {
                'targets': {
                  'browsers': ['last 2 versions']
                }
              }]
            ],
            'plugins': [require('@babel/plugin-syntax-dynamic-import')]
          }
        }
      }
    ]
  }
};