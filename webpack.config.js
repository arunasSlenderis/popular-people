const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = (env, options) => {
  const mode = options.mode;
  const plugins = [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({ template: './src/index.html' }),
    new MiniCssExtractPlugin({
      filename: mode === 'production' ? '[name].[hash].css' : '[name].css',
      chunkFilename: mode === 'production' ? '[id].[hash].css' : '[id].css'
    })
  ];

  if (mode !== 'production') {
    plugins.push(new webpack.HotModuleReplacementPlugin());
  }

  return {
    devtool: mode === 'production' ? 'source-map' : 'eval',
    entry: './src/index.js',
    output: {
      filename: '[name].[hash].js',
      path: path.resolve(__dirname, 'dist')
    },
    plugins,
    module: {
      rules: [
        { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          use: [
            {
              loader:
                mode === 'production'
                  ? MiniCssExtractPlugin.loader
                  : 'style-loader'
            },
            { loader: 'css-loader', options: { sourceMap: true } },
            { loader: 'sass-loader', options: { sourceMap: true } }
          ]
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: ['file-loader']
        }
      ]
    },
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          sourceMap: true
        }),
        new OptimizeCSSAssetsPlugin({})
      ]
    },
    devServer: {
      contentBase: path.resolve(__dirname, 'src'),
      watchContentBase: true,
      hot: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
      }
    }
  };
};
