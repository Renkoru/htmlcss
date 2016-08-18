var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var ASSETS = path.resolve(__dirname, 'htmlcss/assets');
var PUBLIC = path.resolve(__dirname, 'htmlcss/static');

module.exports = {
  devtool: 'source-map',

  entry: {
    app: path.resolve(ASSETS, 'javascript/entry.js'),
  },

  output: {
    path: PUBLIC,
    filename: 'bundle.js'
  },

  plugins: [
    new ExtractTextPlugin('style.css'),
    // to get timestamps on webpack --watch
    function () {
      this.plugin('watch-run', function (watching, callback) {
        console.log('Begin compile at ' + new Date());
        callback();
      });
    }
  ],

  cssLoader: {
    includePaths: [path.resolve(__dirname, 'node_modules')]
  },

  module: {

    // Reduce compilation time by telling webpack to not parse these libraries.
    // Only add libraries that have no dependencies eg. no require, define or similar calls.
    noParse: [
      /lodash/,
    ],

    loaders: [
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(
          'css?sourceMap!postcss!sass?sourceMap&outputStyle=expanded'
        )

      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('css')
      },
      {
        test: /\.html$/,
        loader: 'html'
      },
    ]
  },

};
