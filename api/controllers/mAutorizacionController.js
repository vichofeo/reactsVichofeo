var autorizacionModel = require("../models/mAutorizacionModel");
var sectorModel = require("../models/mSectorModel")
var escenarioModel = require("../models/mEscenarioModel")

var mongoose = require("mongoose");

const addAutorzacion = async (req, res, err) => {
  try {
    let newRegistro = new autorizacionModel({
      nombre_autorzacion: req.body.nombre_autorzacion,
      direccion_autorzacion: req.body.direccion_autorzacion,
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
const initial = async (req, res, err) => {
  try {
    let sector = await sectorModel
    .find({})
    .populate("tipo_sector")
    .sort({ nombre_sector: 1 });
    
   let escenario =  await escenarioModel
      .find({})
      .populate("espacios")
      .sort({ nombre_escenario: 1 });

    let response = {
        sectors: sector.map(i=>{
            return{
                value: i._id,
                label: i.nombre_sector,
                tipo: i.tipo_sector.map(j=>{
                    return {
                        value: j._id,
                        label: j.nombre_tipo_sector
                    }
                })
            }
        }),
        escenarios: escenario.map(i=>{
          return{
            value:i._id,
            label:i.nombre_escenario,
            tipo: i.espacios.map(j=>{
              return{
                value: j._id,
                        label: j.nombre_espacio
              }
            })
          }
        })
    };

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
  
  addAutorzacion,
  
  initial,
};
