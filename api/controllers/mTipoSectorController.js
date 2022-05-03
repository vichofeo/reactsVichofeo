var tipoSectorModel = require("../models/mTipoSectorModel");

var mongoose = require("mongoose");

//servicio verifica nname
const nameValidate = async (req, res, err) => {
  try {
    let tipoSector = await tipoSectorModel.find().byName(req.params.name);
    if (tipoSector.length > 0) throw new Error("Luchador ya existente");

    res.send({ ok: true, mensaje: "tipo sector  disponible" });
  } catch (error) {
    res.send({
      ok: false,
      mensaje: error.mensaje || "errro en la validacion pase por tyr",
    });
  }
};

const addTipoSector = async (req, res, err) => {
  try {
   
    let newRegistro = new tipoSectorModel({
      nombre_tipo_sector: req.body.nombre_tipo_sector,
    });

    newRegistro = await newRegistro.save();

    res.send({
      ok: true,
      mensaje: "guardado exitoso",
      tipoSector: newRegistro,
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
const updateTipoSector = async (req, res, err) => {
  try {
    

    let identificador = req.body._id;
    const update = {
      nombre_tipo_sector: req.body.nombre_tipo_sector,
    };
    let response = await tipoSectorModel.updateOne(
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

const viewTipoSector = async (req, res, err) => {
  try {
    let tipoSector = await tipoSectorModel
      .find({})
      .sort({ nombre_tipo_sector: 1 });
    let response = tipoSector.map((i) => {
      return {
        _id: i._id,
        nombre_tipo_sector: i.nombre_tipo_sector,
      };
    });

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
  addTipoSector,
  updateTipoSector,
  viewTipoSector,
};
