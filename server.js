var React = require('react');
var ReactDOMServer = require('react-dom/server');




var express = require("express");
var app = express();

var bodyParser = require("body-parser");


var webpack = require("webpack");
var webPMiddleware = require("webpack-dev-middleware");


//mongosse
const mongoose = require("mongoose");
const {connect} = require("mongoose")
var configuration = require("./src/utils/config");

//virtual host y api
var vhost = require('vhost')
var api = require('./api/api')

//improtaciones para SSR
var path = require('path')
var fs = require('fs')




let connectString = configuration.mongodb.development.connectionString;


  mongoose
  .connect('mongodb://localhost:27017/iadb', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      
  })
  .then((db) => {
      console.log('MONGO dB CONECTADO....')
  })
  .catch((error) => {
      console.log('error de conexion db....')
  })

//recursos externos arzacion pro headers
// Access-Control-Allow-Origin: *
app.use('*', require('cors')());


//middlewares
app.use("/public", express.static( `${__dirname  }/public`));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));


//virtual host
app.use(vhost('api.ddgmalto.io', api));
app.use(vhost('api.*', api))
app.use(vhost('api.gamea', api));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});



app.listen(80, function () {
  console.log("servidro node escuchando por el pueto 80");
});
 