const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    ui: './src/ui.js',
    app: './src/app.js',
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
  },

  mode: 'production',
  
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: 'vendor',
      minSize: 10000,
      automaticNameDelimiter: '_',
    },
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg)$/,
        use: 'file-loader',
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env'],
            plugins: ['transform-class-properties'],
          },
        },
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),

    new CleanWebpackPlugin(),

    new HtmlWebpackPlugin({
      filename: './index.html',
      chunks: ['app', 'ui', 'vendors~app~ui'],
      title: 'Production',
    }),
  ],
};
