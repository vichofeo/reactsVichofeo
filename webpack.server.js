const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'development',

  entry: './server.js',

  context: path.resolve(__dirname, 'src/'),

  target: 'node',

  externals: [nodeExternals()],

  output: {
    path: path.resolve('server-build'),
    filename: 'index.js'
  },

  module: {
    rules: [
      {
        test: /\.js$|jsx/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  },

  devtool: 'inline-source-map',
};