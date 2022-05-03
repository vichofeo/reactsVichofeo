var escenarioModel = require("../models/mEscenarioModel");
var espacioModel = require("../models/mEspacioModel");
var itemsAdicionalModel = require("../models/mAdicionalModel");

var mongoose = require("mongoose");

//servicio verifica nname
const nameValidate = async (req, res, err) => {
  try {
    let registroRow = await escenarioModel.find().byName(req.params.name);
    if (registroRow.length > 0) throw new Error("registro ya existente");

    res.send({ ok: true, mensaje: "Nombre de escenario  disponible" });
  } catch (error) {
    res.send({
      ok: false,
      mensaje: error.mensaje || "error en la validacion pase por tyr",
    });
  }
};

const addEscenario = async (req, res, err) => {
  try {
    let newRegistro = new escenarioModel({
      nombre_escenario: req.body.nombre_escenario,
      direccion_escenario: req.body.direccion_escenario,
      valor_hora: req.body.valor_hora,
      espacios: req.body.espacios,
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
const updateEscenario = async (req, res, err) => {
  try {
    let identificador = req.body._id;
    const update = {
      nombre_escenario: req.body.nombre_escenario,
      direccion_escenario: req.body.direccion_escenario,
      valor_hora: req.body.valor_hora,
      espacios: req.body.espacios,
    };
    let response = await escenarioModel.updateOne(
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

const updateEscenarioAdicionales = async (req, res, err) => {
  try {
    let identificador = req.body._id;
    const update = {
      adicionales: req.body.adicionales.map((i) => ({
        _id: i._id,
        valor_hora: i.valor_hora,
      })),
    };
    
    let response = await escenarioModel.updateOne(
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

const viewEscenario = async (req, res, err) => {
  try {
    let espacio = await espacioModel.find({}).sort({ nombre_espacio: 1 });

    let registroRow = await escenarioModel
      .find({})
      .populate({ path: "espacios", model: espacioModel })
      .populate({ path: "adicionales._id", select: 'item_adicional' })
      .sort({ nombre_escenario: 1 });

    let itemsAdicional = await itemsAdicionalModel
      .find({})
      .sort({ item_adicional: 1 });

    const diferenciaDeArreglos = (arr1, arr2) => {
      return arr1.filter(
        (elemento1) =>
          arr2.findIndex(
            (elemento2) =>
              JSON.stringify(elemento1) === JSON.stringify(elemento2)
          ) === -1
      );
    };

    let response = registroRow.map((i) => {
      return {
        _id: i._id,
        nombre_escenario: i.nombre_escenario,
        direccion_escenario: i.direccion_escenario,
        valor_hora: i.valor_hora,        
        selected: i.espacios.map((j) => {
          return {
            value: j._id,
            label: j.nombre_espacio,
          };
        }),
        adicionales: i.adicionales.map((j) => ({
          value: j._id._id,
          label: j._id.item_adicional,
          valor_hora: j.valor_hora
        })),
      };
    });

    res.send({
      ok: true,
      body: response,
      options: espacio.map((i) => {
        return {
          value: i._id,
          label: i.nombre_espacio,
        };
      }),
      adicionales: itemsAdicional.map((i) => ({
        value: i._id,
        label: i.item_adicional,
      })),
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
  addEscenario,
  updateEscenario,
  updateEscenarioAdicionales,
  viewEscenario,
};
