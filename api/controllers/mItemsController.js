var itemsAdicionalModel = require("../models/mAdicionalModel");

var mongoose = require("mongoose");

//servicio verifica nname
const nameValidate = async (req, res, err) => {
  try {
    let registroRow = await itemsAdicionalModel.find().byName(req.params.name);
    if (registroRow.length > 0) throw new Error("nombre de item Adicional ya existente");

    res.send({ ok: true, mensaje: "nombre de Item Adicional disponible" });
  } catch (error) {
    res.send({
      ok: false,
      mensaje: error.mensaje || "errro en la validacion pase por tyr",
    });
  }
};

const addItemAdicional = async (req, res, err) => {
  try {
   
    let newRegistro = new itemsAdicionalModel({
      item_adicional: req.body.item_adicional,
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
const updateItemAdicional = async (req, res, err) => {
  try {
    

    let identificador = req.body._id;
    const update = {
      item_adicional: req.body.item_adicional,
    };
    let response = await itemsAdicionalModel.updateOne(
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

const viewItemAdicional = async (req, res, err) => {
  try {
    let registroRow = await itemsAdicionalModel
      .find({})
      .sort({ item_adicional: 1 });
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
  addItemAdicional,
  updateItemAdicional,
  viewItemAdicional,
};
