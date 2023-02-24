var luchadorModel = require("../models/luchadorModel");

var mongoose = require("mongoose");

//servicio verifica nname
const nameValidate = async (req, res, err) => {
  try {
    let luchador = await luchadorModel.find().byName(req.params.name);
    if (luchador.length > 0) throw new Error("Luchador ya existente");

    res.send({ ok: true, mensaje: "clave de luchador disponible" });
  } catch (error) {
    res.send({
      ok: false,
      mensaje: error.mensaje || "errro en la validacion pase por tyr",
    });
  }
};

const addLuchador = async (req, res, err) => {
  try {
    let newLuchador = new luchadorModel({
      name: req.body.name,
      nombre: req.body.nombre,
      avatar: req.body.avatar,
      foto: req.body.foto,
      musica: req.body.musica,
    });

    newLuchador = await newLuchador.save();

    res.send({
      ok: true,
      mensaje: "guardado exitoso",
      luchador: newLuchador,
    });
  } catch (error) {
    let mensaje = null;
    if (error.errors != null && error.errors.name != null) {
      mensaje = "Nombre de luchador clave existente";
    } else {
      mensaje = " errro al guardrar";
    }

    res.send({
      ok: false,
      mensaje: "falla en la creacion de luchador",
      error: mensaje || error.message,
    });
  }
};
//actulizar luchadoir
const updateLuchador = async (req, res, err) => {
  
  try {
    let identificador = req.body._id
    const update = {
      name: req.body.name,
      nombre: req.body.nombre,
      avatar: req.body.avatar,
      foto: req.body.foto,
      musica: req.body.musica,
    }
    let response = await luchadorModel.updateOne({ _id: identificador }, update)

    res.send({
      ok: true,
    })
  } catch (error) {
    res.send({
      ok: false,
      mensaje: error.message || 'Error al actulizar el perfil',
    })
  }
}
const viewLuchador = async (req, res, err) => {
  try {
    let luchadores = await luchadorModel.find({}).sort({ name: -1 });
    let response = luchadores.map((i) => {
      return {
        _id: i._id,
        name: i.name,
        nombre: i.nombre,
        avatar: i.avatar,
        musica: i.musica,
        foto: i.foto,
      };
    });

    res.send({
      ok: true,
      body: response,
    });
  } catch (error) {
    res.send({
      ok: false,
      mensaje: error.message || "Error en el pedido de los datos de luchadores",
      error: error,
    });
  }
};

const viewLuchadorLite = async (req, res, err) => {
  try {
    let luchadores = await luchadorModel.find({}).sort({ name: 1 });
    let response = luchadores.map((i) => {
      return {
        _id: i._id,
        name: i.name,
        nombre: i.nombre,
        avatar: i.avatar,
        
      };
    });

    res.send({
      ok: true,
      body: response,
    });
  } catch (error) {
    res.send({
      ok: false,
      mensaje: error.message || "Error en el pedido de los datos de luchadores",
      error: error,
    });
  }
};
const viewLuchadorLimit = async (req, res, err) => {
  try {
    //let luchadores = await luchadorModel.find({},{name:1}).sort({ name: 1 });
    let totalRows = await luchadorModel.find({}).count();
    let rowsPerPage = 5;
    let pageActive=1
            
    const datos = req.body
    if(datos){
      rowsPerPage = datos.rowsPerPage ? datos.rowsPerPage : rowsPerPage
      pageActive = datos.pageActive ? datos.pageActive : pageActive      
    }
    let blocksPages = Math.ceil(totalRows / rowsPerPage)

    let inicial = rowsPerPage * (pageActive - 1) +1
    const luchadores = await luchadorModel.find({}).limit(rowsPerPage).skip(inicial - 1);

    const response = luchadores.map((i) => {
      return {
        _id: i._id,
        name: i.name,
        nombre: i.nombre,
        avatar: i.avatar,
        musica: i.musica,
        foto: i.foto,
      };
    });

    res.send({
      ok: true,
      body: {blocksPages: blocksPages, pageActive: pageActive, luchadores: response},
    });
  } catch (error) {
    res.send({
      ok: false,
      mensaje: error.message || "Error en el pedido de los datos de luchadores",
      error: error,
    });
  } 
};
module.exports = {
  nameValidate,
  addLuchador,
  updateLuchador,
  viewLuchador,
  viewLuchadorLite, 
  viewLuchadorLimit,
  
};
