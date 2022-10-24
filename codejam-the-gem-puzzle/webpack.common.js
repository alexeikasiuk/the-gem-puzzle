const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[name][contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'RSS Gem Puzzle',
      favicon: './src/assets/images/icons/favicon.ico',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(mp3|mp4|wav|woff|woff2|eot|ttf|otf|png|svg|jpg|jpeg|gif)$/,
        type: 'asset',
      },
    ],
  },
  optimization: {
    minimize: true,
    moduleIds: 'size',
  },
};
