const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: {
    index: ['core-js/fn/promise', './src/javascripts/index.js']
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'javascripts/[name].js',
    chunkFilename: 'javascripts/[name].js',
    publicPath: '/',
  },

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
  },

  plugins: [
    new UglifyJsPlugin()
  ]
};