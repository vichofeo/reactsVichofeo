var sectorModel = require("../models/mSectorModel");
var tipoSectorModel = require("../models/mTipoSectorModel");

var mongoose = require("mongoose");

//servicio verifica nname
const nameValidate = async (req, res, err) => {
  try {
    let sector = await sectorModel.find().byName(req.params.name);
    if (sector.length > 0) throw new Error("registro ya existente");

    res.send({ ok: true, mensaje: "tipo sector  disponible" });
  } catch (error) {
    res.send({
      ok: false,
      mensaje: error.mensaje || "error en la validacion pase por tyr",
    });
  }
};

const addSector = async (req, res, err) => {
  try {
    let newRegistro = new sectorModel({
      nombre_sector: req.body.nombre_sector,
      tipo_sector: req.body.tipo_sector,
    });

    newRegistro = await newRegistro.save();

    res.send({
      ok: true,
      mensaje: "guardado exitoso",
      sector: newRegistro,
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
const updateSector = async (req, res, err) => {
  try {
    let identificador = req.body._id;
    const update = {
      nombre_sector: req.body.nombre_sector,
      tipo_sector: req.body.tipo_sector
    };
    let response = await sectorModel.updateOne({ _id: identificador }, update);

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

const viewSector = async (req, res, err) => {
  try {
    let tipo_sector = await tipoSectorModel
      .find({})
      .sort({ nombre_tipo_sector: 1 });

    let sector = await sectorModel
      .find({})
      .populate("tipo_sector")
      .sort({ nombre_sector: 1 });
    
    const diferenciaDeArreglos = (arr1, arr2) => {
      return arr1.filter(
        (elemento1) =>
          arr2.findIndex(
            (elemento2) =>
              JSON.stringify(elemento1) === JSON.stringify(elemento2)
          ) === -1
      );
    };

    let response = sector.map((i) => {
      return {
        _id: i._id,
        nombre_sector: i.nombre_sector,
        selected: i.tipo_sector.map((i) => {
          return {
            value: i._id,
            label: i.nombre_tipo_sector,
          };
        }),
        options: diferenciaDeArreglos(tipo_sector, i.tipo_sector).map((i) => {
          return {
            value: i._id,
            label: i.nombre_tipo_sector,
          };
        }),
      };
    });

    res.send({
      ok: true,
      body: response,
      options: tipo_sector.map((i) => {
        return {
          value: i._id,
          label: i.nombre_tipo_sector,
        };
      }),
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
  addSector,
  updateSector,
  viewSector,
};
