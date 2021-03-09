const HtmlPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
<<<<<<< HEAD
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
=======
const StyleLintPlugin = require('stylelint-webpack-plugin');
>>>>>>> afea08f882462780a478911a507f2af1875bbd14
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
  },
  plugins: [
    new HtmlPlugin({
      filename: 'index.html',
      template: './src/index.html',
    }),
    new MiniCSSExtractPlugin(),
<<<<<<< HEAD
    new CleanWebpackPlugin(),
=======
    new StyleLintPlugin({
      files: 'src/**/*.scss',
    }),
>>>>>>> afea08f882462780a478911a507f2af1875bbd14
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCSSExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: ['...', new CssMinimizerPlugin()],
  },
};
