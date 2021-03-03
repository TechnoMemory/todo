const path = require('path');
const nodeExternals = require('webpack-node-externals');
const NodemonPlugin = require('nodemon-webpack-plugin');

module.exports = {
  entry: {
    server: './app.js',
  },

  output: {
    filename: 'server.bundle.js',
    path: path.resolve('./dist'),
  },

  mode: 'development',
  target: 'node',
  externals: [nodeExternals()],

  module: {
    rules: [
      {
        test: /\.(png|jpg)$/,
        use: 'file-loader',
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env'],
            plugins: [
              'transform-class-properties',
              '@babel/plugin-transform-runtime',
            ],
          },
        },
      },
    ],
  },

  plugins: [new NodemonPlugin()],
};
