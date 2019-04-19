const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

const { VueLoaderPlugin } = require('vue-loader')
const _ = require('lodash')

const isProd = process.env.NODE_ENV === 'production'

function resolve (dir) {
  return path.join(__dirname, '..', dir);
}

module.exports = {
  devtool: isProd
    ? false
    : '#cheap-module-source-map',
  output: {
    path: resolve('dist'),
    publicPath: '/dist/',
    filename: '[name].[chunkhash].js'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'public': resolve('public'),
      'assets': resolve('src/assets'),
      '@': resolve('src'),
    },
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(vue)$/,
        loader: 'eslint-loader',
        include: [
          resolve('src'),
        ],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          compilerOptions: {
            preserveWhitespace: false
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: _.compact([
          resolve('src'),
          resolve('models'),
          // node modules that are written in ES6 should be added here for the build
          resolve('node_modules/bootstrap-vue'),
          resolve('node_modules/vue-disqus'),
        ]),
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
          resolve('models'),
        ],
        options: {
          presets: ['@babel/preset-env']
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.styl(us)?$/,
        use: isProd
          ? ExtractTextPlugin.extract({
              use: [
                {
                  loader: 'css-loader',
                  options: { minimize: true }
                },
                'stylus-loader'
              ],
              fallback: 'vue-style-loader'
            })
          : ['vue-style-loader', 'css-loader', 'stylus-loader']
      },
    ]
  },
  performance: {
    maxEntrypointSize: 300000,
    hints: isProd ? 'warning' : false
  },
  plugins: [
    ...(isProd
      ? [
          new VueLoaderPlugin(),
          new UglifyJSPlugin(),
          new webpack.optimize.ModuleConcatenationPlugin(),
          new ExtractTextPlugin({
            filename: 'common.[chunkhash].css'
          })
        ]
      : [
          new VueLoaderPlugin(),
          new FriendlyErrorsPlugin()
        ])
  ]
}
