'use strict';

const HTMLPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: `${__dirname}/app/entry.js`, //entry points of the program
  output: {
    filename: 'bundle.js', //name of the bundle
    path: 'build', //
  },
  // wrote our own template so there isn't default behavior
  plugins: [
    new HTMLPlugin({
      template: `${__dirname}/app/index.html`,
    }),
    // takes output of css loader and turn it into bundle css
    new ExtractTextPlugin('bundle.css'),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/, //$ - regex that means end of line
        exclude: /node_modules/,
        loader: 'babel',
      },
      {
        test: /\.scss$/, //regex to match file exression - run loader on all files that match this expression
        loader: ExtractTextPlugin.extract('style', 'css!resolve-url!sass?sourceMap'), //match loaders chain - goes right to left
        //style loader- injects style into page
        //style loader is backup
        //resolve url uses relative paths- used for font awesome which uses relative paths
      },
      {
        test:/\.(eot|woff|ttf|svg).*/, //.* -> any other characters
        loader: 'url?limit=10000&name=fonts/[hash].[ext]', //10000 bytes
        // if less than 10000, put in, else put it in fonts directory

      },
    ],
  },
};

//killall node turns off webpack dev-server
