const path = require("path");

const webpack = require('webpack');

const HTMLWebpackPlugin = require("html-webpack-plugin");
const basePath = __dirname;
const distPath = "dist";

const indextInput = "./public/index.html";
const indexOutput = "index.html";
const webpackInitConfig = {
  // EVIROMENT MODE
  mode: process.env.NODE_ENV || "development",
  resolve: {
    extensions: [".js", '.json', '.jsx'],
    modules: [path.resolve(__dirname, "src"), "node_modules"],
  },
  // DEV SERVER ENTRY POINT
  devServer: {
    contentBase: path.join(__dirname, "src"),
    hot: true,
  },
  entry: {
    app: [ `${__dirname  }/src/App.js`,],
  },
  output: {
    path: `${__dirname  }/public`, //path.join(basePath, distPath),
    filename: "bundle.js", //"[chunkhash][name].js",
    publicPath: "/public",
  },
  devServer:{
    port: 8080,
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/, ///\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',//use: ["babel-loader"],
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
          plugins: [
            "@babel/plugin-proposal-class-properties",
            "@babel/plugin-proposal-export-default-from",
            "react-hot-loader/babel",
            "module:jsx-control-statements"
          ]
        }
      },
      {
        test: /\.(jpg|png|svg)$/,
        use: {
           loader: 'url-loader',
           options: {
              limit: 25000
           }
        }
     },
     {
      test: /\.css$/i,
      use: ["style-loader", "css-loader"]
   },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(true),
      VERSION: JSON.stringify('5fa3b9'),
      BROWSER_SUPPORTS_HTML5: true,
      TWO: '1+1',
      'typeof window': JSON.stringify('object'),
      //'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV), 
      'process.env.NODE_ENV': JSON.stringify('development'), 
    }) ,
    new webpack.HotModuleReplacementPlugin(),
    new HTMLWebpackPlugin({
      filename: indexOutput,
      template: indextInput,
    }),
       
    
  ],
};
module.exports = webpackInitConfig;
