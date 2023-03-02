var express = require("express");
var router = express.Router();

//require para jwt
var configuration = require('../src/utils/config')
var jwt = require("jsonwebtoken")

//middleware autorizacion 
router.use('/', function(req, res, next){
  var token = req.headers['authorization']
  if(!token){
    next()
    req.user = null
    return
  }
  token = token.replace('Bearer ', '')
  jwt.verify(token, configuration.jwt.secret, (err, user)=>{
    if (err) {
      req.user = null
      next()
    }else{
      
      req.user = user
      next()
    }
  })
})

//negaciond e servicios por path secure
router.use('/secure', (req,res,next)=>{
  if (req.user === null) {
    res.status(401).send({
      ok:false,
      message: 'Token invalido'
    })
    return
  }
  next()
})

//controladores
var luchadorController = require("../api/controllers/luchadorController")
var programaController = require("../api/controllers/programaController")

//registro usuario



//acceso restringido
router.get('/viewLuchador', luchadorController.viewLuchador)
router.get('/viewLuchadorLite', luchadorController.viewLuchadorLite)
router.put('/viewLuchadorLimit', luchadorController.viewLuchadorLimit)
router.put('/viewLuchadores', luchadorController.viewLuchadores)
router.get('/validateName/:name', luchadorController.nameValidate)
router.get('/getMuss/:id', luchadorController.getMussLuchador)
router.post('/addLuchador', luchadorController.addLuchador)
router.put('/updateLuchador', luchadorController.updateLuchador)


router.post('/addPrograma', programaController.addPrograma)
router.put('/updatePrograma', programaController.updatePrograma)
router.get('/viewProgram', programaController.viewProgram)
router.get('/getPrograms', programaController.getPrograms)
router.get('/getProgramUltime/:id', programaController.getProgramUltime)
//acceso publico al servicio
//router.get('/tweets/:user', tweetController.getUserTweets)

router.get("/test", (req, res) => {
  res.send("Esta es una prueba");
});

router.get("/*", function (req, res, err) {
  res.status(400).send({ message: "Servicio invalido" });
});

//alta de usuarios

module.exports = router;
