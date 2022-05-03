var React = require('react');
var ReactDOMServer = require('react-dom/server');

//var Appjs = require('./src/App');


var express = require("express");
var app = express();

var bodyParser = require("body-parser");


var webpack = require("webpack");
var webPMiddleware = require("webpack-dev-middleware");
var wconfig = require("./webpack.config");
var compiler = webpack(wconfig);

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

/* 
if (process.env.NODE_ENV !== 'production') {
app.use(
  webPMiddleware(compiler, {
    publicPath: wconfig.output.publicPath,
  })
);
}
*/
//virtual host
app.use(vhost('api.*', api))
app.use(vhost('ia.io', api));
/*
//ruteos
app.get('/*',(req, res)=>{
  
  const appj = ReactDOMServer.renderToString(<Appjs />);

  const indexFile = path.resolve('./dist/index.html')

  fs.readFile(indexFile, 'utf-8', (err, data)=>{
    if(err){
      console.error("error mientras se leia archivo APPJS", err)
      return res.status(500).send('oppssss, no hay nada, intentelo mas tarde')
    }

    return res.send(
      data.replace('<div id="root"></div>', `<div id="root">${appj}</div>`)
    )
  })
})
app.use(express.static('./dist'))
*/
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

/*
//servidor en https
var fs = require('fs')
var https= require('https')
var http= require('http')

https.createServer({
  key: fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./cert.pem'),
  passphrase: 'vichofeo'  
}, app ).listen(443, ()=>{
  console.log("escuchando por el puero 443")
})

http.createServer(function(req,res){
  res.writeHead(301, {"Location": `https://${  req.headers['host']  }${req.url}`})
  res.end()
}).listen(80)
*/

app.listen(8080, function () {
  console.log("servidro node escuchando por el pueto 8080");
});
 