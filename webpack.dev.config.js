const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    ui: './src/ui.js',
    app: './src/app.js',
  },

  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },

  mode: 'development',

  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    // writeToDisk: true,
  },

  devtool: 'source-map',

  module: {
    rules: [
      {
        test: /\.(png|jpg)$/,
        use: 'file-loader',
      },

      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
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

  plugins: [
    new CleanWebpackPlugin(),

    new HtmlWebpackPlugin({
      filename: './index.html',
      chunks: ['ui', 'app'],
      title: 'Development',
    }),
  ],
};
