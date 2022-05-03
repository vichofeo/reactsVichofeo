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

var tipoSectorController = require("../api/controllers/mTipoSectorController")
var sectorController = require("../api/controllers/mSectorController")
var espacioController = require("../api/controllers/mEspacioController")
var escenarioController = require("../api/controllers/mEscenarioController")
var autorizacionController = require("../api/controllers/mAutorizacionController")
//registro usuario



//acceso restringido
router.get('/viewLuchador', luchadorController.viewLuchador)
router.get('/viewLuchadorLite', luchadorController.viewLuchadorLite)
router.get('/validateName/:name', luchadorController.nameValidate)
router.post('/addLuchador', luchadorController.addLuchador)
router.put('/updateLuchador', luchadorController.updateLuchador)


router.post('/addPrograma', programaController.addPrograma)
router.get('/viewProgram', programaController.viewProgram)
router.get('/getProgramUltime', programaController.getProgramUltime)
//acceso publico al servicio
//router.get('/tweets/:user', tweetController.getUserTweets)
//multifuncional
router.get('/validateNameTipoSector/:name', tipoSectorController.nameValidate)
router.get('/viewTipoSector', tipoSectorController.viewTipoSector)
router.post('/addTipoSector', tipoSectorController.addTipoSector)
router.put('/updateTipoSector', tipoSectorController.updateTipoSector)


router.get('/validateNamesector/:name', sectorController.nameValidate)
router.get('/viewSector', sectorController.viewSector)
router.post('/addSector', sectorController.addSector)
router.put('/updateSector', sectorController.updateSector)

router.get('/validateNameEspacio/:name', espacioController.nameValidate)
router.get('/viewEspacio', espacioController.viewEspacio)
router.post('/addEspacio', espacioController.addEspacio)
router.put('/updateEspacio', espacioController.updateEspacio)

router.get('/validateNameEscenario/:name', escenarioController.nameValidate)
router.get('/viewEscenario', escenarioController.viewEscenario)
router.post('/addEscenario', escenarioController.addEscenario)
router.put('/updateEscenario', escenarioController.updateEscenario)

router.get('/initial', autorizacionController.initial)

router.get("/*", function (req, res, err) {
  res.status(400).send({ message: "Servicio invalido" });
});

//alta de usuarios

module.exports = router;
