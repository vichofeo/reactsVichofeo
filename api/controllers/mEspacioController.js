var espacioModel = require("../models/mEspacioModel");

var mongoose = require("mongoose");

//servicio verifica nname
const nameValidate = async (req, res, err) => {
  try {
    let registroRow = await espacioModel.find().byName(req.params.name);
    if (registroRow.length > 0) throw new Error("nombre de espacio ya existente");

    res.send({ ok: true, mensaje: "nombre de espacio  disponible" });
  } catch (error) {
    res.send({
      ok: false,
      mensaje: error.mensaje || "errro en la validacion pase por tyr",
    });
  }
};

const addEspacio = async (req, res, err) => {
  try {
   
    let newRegistro = new espacioModel({
      nombre_espacio: req.body.nombre_espacio,
    });

    newRegistro = await newRegistro.save();

    res.send({
      ok: true,
      mensaje: "guardado exitoso",
      registroRow: newRegistro,
    });
  } catch (error) {
    let mensaje = null;
    if (error.errors != null && error.errors.name != null) {
      mensaje = "Nombre  clave existente";
    } else {
      mensaje = " error al guardrar";
    }

    res.send({
      ok: false,
      mensaje: "falla en la creacion ",
      error: mensaje || error.message,
    });
  }
};
//actulizar luchadoir
const updateEspacio = async (req, res, err) => {
  try {
    

    let identificador = req.body._id;
    const update = {
      nombre_espacio: req.body.nombre_espacio,
    };
    let response = await espacioModel.updateOne(
      { _id: identificador },
      update
    );

    res.send({
      ok: true,
    });
  } catch (error) {
    res.send({
      ok: false,
      mensaje: error.message || "Error al actulizar ",
    });
  }
};

const viewEspacio = async (req, res, err) => {
  try {
    let registroRow = await espacioModel
      .find({})
      .sort({ nombre_espacio: 1 });
    let response = registroRow

    res.send({
      ok: true,
      body: response,
    });
  } catch (error) {
    res.send({
      ok: false,
      mensaje: error.message || "Error en el pedido de los datos",
      error: error,
    });
  }
};
module.exports = {
  nameValidate,
  addEspacio,
  updateEspacio,
  viewEspacio,
};
