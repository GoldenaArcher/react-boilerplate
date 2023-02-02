const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const imageInlineSizeLimit = parseInt(
  process.env.IMAGE_INLINE_SIZE_LIMIT || '10000'
);

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    historyApiFallback: true,
    port: 3005,
    hot: true,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: [/\.avif$/],
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: imageInlineSizeLimit,
              mimetype: 'image/avif',
              name: 'static/media/[name].[contenthash:8].[ext]',
            },
          },
        ],
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: imageInlineSizeLimit,
              name: 'static/media/[name].[contenthash:8].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new ReactRefreshWebpackPlugin(),
  ],
};
