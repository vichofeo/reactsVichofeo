var express = require("express");
var router = express.Router();

//require para jwt

var jwt = require("jsonwebtoken")

//middleware autorizacion 


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


var tipoSectorController = require("../api/controllers/mTipoSectorController")
var sectorController = require("../api/controllers/mSectorController")
var espacioController = require("../api/controllers/mEspacioController")
var escenarioController = require("../api/controllers/mEscenarioController")
var autorizacionController = require("../api/controllers/mAutorizacionController")
var itemAdicionalController = require("../api/controllers/mItemsController")
//registro usuario




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
router.put('/updateEscenarioAdicionales', escenarioController.updateEscenarioAdicionales)

router.get('/validateNameItemAdicional/:name', itemAdicionalController.nameValidate)
router.get('/viewItemAdicional', itemAdicionalController.viewItemAdicional)
router.post('/addItemAdicional', itemAdicionalController.addItemAdicional)
router.put('/updateItemAdicional', itemAdicionalController.updateItemAdicional)

router.get('/initial', autorizacionController.initial)
router.get('/viewAuto', autorizacionController.viewProgramacion)
router.post('/byFecha', autorizacionController.searchByFecha)
router.post('/byFechaHora', autorizacionController.searchByFechaHora)
router.post('/byFechaRango', autorizacionController.searchByFechaRangoHora)
router.post('/addAutorizacion', autorizacionController.addAutorzacion)

router.get("/*", function (req, res, err) {
  res.status(400).send({ message: "Servicio invalido" });
});

//alta de usuarios

module.exports = router;
