const path = require('path');

// const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {

  devtool: 'source-map',
  entry: {
    app: './src/app.jsx'
  },
  output: {
    path: path.join(__dirname, 'public'),
    filename: '[name]-bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components|src\/worker.js)/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.scss$/,
        use: [{
            loader: "style-loader" // creates style nodes from JS strings
        }, {
            loader: "css-loader" // translates CSS into CommonJS
        }, {
            loader: "sass-loader" // compiles Sass to CSS
        }]
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([ {from:'src/index.html', to: 'index.html'} ])
  ],

  devServer: {
    disableHostCheck: true,
    host: '0.0.0.0',
    port: process.env.PORT || 8080
  }
};




