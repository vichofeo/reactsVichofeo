var autorizacionModel = require("../models/mAutorizacionModel");
var sectorModel = require("../models/mSectorModel");
var escenarioModel = require("../models/mEscenarioModel");
var moment = require("node-moment");

var mongoose = require("mongoose");

const addAutorzacion = async (req, res, err) => {
  try {
    let newRegistro = new autorizacionModel({
      organizacion: req.body.organizacion,
      telefono: req.body.telefono,
      sector: req.body.sector,
      tsector: req.body.tsector,
      escenario_id: req.body.escenario_id,
      escenario: req.body.escenario,
      tescenario: req.body.tescenario,
      programacion: req.body.programacion.map((i) => {
        return {
          fecha: new Date(`${i.fecha} GMT+0000`),
          hora_inicio: new Date(`${i.fecha} ${i.hora_inicio} GMT+0000`),
          hora_fin: new Date(`${i.fecha} ${i.hora_fin} GMT+0000`),
          duracion: i.duracion,
        };
      }),
      descripcion_actividad: req.body.descripcion_actividad,
      observaciones: req.body.observaciones,
      servicios: req.body.servicios,
      segmentos: req.body.segmentos,
      costo_final: req.body.costo_total,
    });

    newRegistro = await newRegistro.save();

    res.send({
      ok: true,
      mensaje: "guardado exitoso",
      registroRow: newRegistro,
    });
  } catch (error) {
    let mensaje = " error al guardrar";

    res.send({
      ok: false,
      mensaje: "falla en la creacion ",
      error:  error.message,
      x: error,
    });
  }
};
const toStringFecha = (cadena) => {
  let fecha = new Date(cadena + " GMT+0000");
  return (
    fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate()
  );
};
const toStringHora = (fecha) => {
  //let fecha = new Date(cadena + " GMT+0000")

  return " " + fecha.toISOString().substring(11, 16); //' ' + cadena.getHours() + ':' + cadena.getMinutes()
};
//busca por fecha inicial
const searchByFechaHora = async (req, res, err) => {
  try {
    let fechaIn = req.body.dato + " GMT+0000";
    let escenario = req.body.escenario;
    //fechaIn = "2022-04-10 19:00 GMT+0000";
    let ocupados = await autorizacionModel.find(
      {
        $and: [
          { escenario_id: escenario },

          {
            programacion: {
              $elemMatch: {
                $and: [
                  { hora_inicio: { $lt: new Date(fechaIn) } },
                  { hora_fin: { $gt: new Date(fechaIn) } },
                ],
              },
            },
          },
        ],
      },
      {
        _id: 0,
        programacion: { hora_inicio: 1, hora_fin: 1 },
      }
    );
    fechaIn = toStringFecha(fechaIn);

    let mensaje = "Fecha Libre";
    let lok = true;
    if (ocupados.length > 0) {
      let aux = ocupados.map((prog) =>
        prog.programacion.map((i) => {
          let t1 = toStringFecha(i.hora_inicio);
          let t2 = toStringFecha(i.hora_fin);
          if (t1 === fechaIn || t2 === fechaIn)
            return (
              t1 +
              toStringHora(i.hora_inicio) +
              " <-> " +
              t2 +
              toStringHora(i.hora_fin)
            );
          else return null;
        })
      );
      aux = aux.toString();
      aux = aux.replaceAll(",,", ",");
      aux = aux.split(",");
      aux = aux.filter((item, index) => {
        return aux.indexOf(item) === index;
      });
      aux = aux.join(", ");
      mensaje = "La Hora esta ocupada: " + aux;
      lok = false;
    }

    res.send({
      ok: true,
      lok: lok,
      mensaje: mensaje,
    });
  } catch (error) {
    res.send({
      ok: false,
      mensaje: error.message || "Error en la busqueda de escenario por fecha",
      error: error,
    });
  }
};
const searchByFecha = async (req, res, err) => {
  try {
    let fechaIn = req.body.dato + " GMT+0000";
    let escenario = req.body.escenario;
    //fechaIn = "2022-04-10 GMT+0000";
    let ocupados = await autorizacionModel.find(
      {
        $and: [
          { escenario_id: escenario },

          {
            programacion: {
              $elemMatch: {
                fecha: { $eq: new Date(fechaIn) },
              },
            },
          },
        ],
      },
      { organizacion: 1, _id: 0 }
    );

    let mensaje = "Fecha Libre";
    let lok = true;
    if (ocupados.length > 0) {
      let aux = ocupados.map((i) => i.organizacion);
      aux.sort();
      aux = aux.filter((item, index) => {
        return aux.indexOf(item) === index;
      });
      aux = aux.join(", ");
      mensaje = "Cuidado hay reservas en la fecha Solicitada: " + aux;
      lok = false;
    }

    res.send({
      ok: true,

      lok: lok,
      mensaje: mensaje,
    });
  } catch (error) {
    res.send({
      ok: false,
      mensaje: error.message || "Error en la busqueda de escenario por fecha",
      error: error,
    });
  }
};

const searchByFechaRangoHora = async (req, res, err) => {
  try {
    let fechaIn = req.body.dato1 + " GMT+0000";
    let fechaEnd = req.body.dato2 + " GMT+0000";
    let escenario = req.body.escenario;

    //fechaIn = "2022-04-10 17:00 GMT+0000";
    //fechaEnd = "2022-04-10 23:00 GMT+0000";

    let ocupados = await autorizacionModel.find(
      {
        $and: [
          { escenario_id: escenario },

          {
            programacion: {
              $elemMatch: {
                $or: [
                  {
                    $and: [
                      { hora_inicio: { $lt: new Date(fechaEnd) } },
                      { hora_fin: { $gt: new Date(fechaEnd) } },
                    ],
                  },
                  {
                    $and: [
                      { hora_inicio: { $lt: new Date(fechaIn) } },
                      { hora_fin: { $gt: new Date(fechaIn) } },
                    ],
                  },
                  {
                    $and: [
                      { hora_inicio: { $lt: new Date(fechaEnd) } },
                      { hora_inicio: { $gt: new Date(fechaIn) } },
                    ],
                  },
                  {
                    $and: [
                      { hora_fin: { $lt: new Date(fechaEnd) } },
                      { hora_fin: { $gt: new Date(fechaIn) } },
                    ],
                  },
                ],
              },
            },
          },
        ],
      },
      {
        escenario: 1,
      }
    );
    let lok = true;
    let mensaje = "Fecha Libre, puede agregar (rangos)";
    if (ocupados.length > 0) {
      lok = false;
      mensaje = "Usted no puede agregar estos datos. Vuelva a intentarlo";
    }

    res.send({
      ok: true,
      mensaje: mensaje,
      lok: lok,
      ocupados,
    });
  } catch (error) {
    res.send({
      ok: false,
      mensaje: error.message || "Error en la busqueda de escenario por fecha",
      error: error,
    });
  }
};
const initial = async (req, res, err) => {
  try {
    let sector = await sectorModel
      .find({})
      .populate("tipo_sector")
      .sort({ nombre_sector: 1 });

    let escenario = await escenarioModel
      .find({})
      .populate("espacios")
      .populate({path:"adicionales._id", select: 'item_adicional' })
      .sort({ nombre_escenario: 1 });

     
    let organizaciones = await autorizacionModel.distinct("organizacion");

    let response = {
      organizaciones: organizaciones,
      sectors: sector.map((i) => {
        return {
          value: i._id,
          label: i.nombre_sector,
          tipo: i.tipo_sector.map((j) => {
            return {
              value: j._id,
              label: j.nombre_tipo_sector,
            };
          }),
          
        };
      }),
      escenarios: escenario.map((i) => {
        i.adicionales.unshift({_id:{_id:null, item_adicional:"Alquiler Escenario"}, valor_hora:i.valor_hora})
        return {
          value: i._id,
          label: i.nombre_escenario,
          tipo: i.espacios.map((j) => {
            return {
              value: j._id,
              label: j.nombre_espacio,
            };
          }),
          vhora: i.valor_hora,
          adicionales: i.adicionales.map(j=>({
            value: j._id._id,
            label: j._id.item_adicional,
            valor_hora: j.valor_hora,
            
          })),
        };
      }),
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

const viewProgramacion = async (req, res, err) => {
  try {
    //let fechaIn = req.body.dato + " GMT+0000";
    //let escenario = req.body.escenario;
    //fechaIn = "2022-04-10 GMT+0000";
    let datos = await autorizacionModel.find(
      {},
      { organizacion: 1, _id: 0, programacion: 1, escenario: 1 }
    );
    let requestDatos = {};
    let escenarios = {};
    let fechas = {};
    let auxRequest = [];
    for (let i = 0; i < datos.length; i++) {
      let aux = datos[i].programacion;

      for (let j = 0; j < aux.length; j++) {
        let t = datos[i].programacion[j].fecha;
        t = t.toISOString().substring(0, 10);
        let esc = datos[i].escenario;

        let aux1 = {
          fecha: t,
          escenario: esc,
          organizacion: datos[i].organizacion,
          inicio: toStringHora(datos[i].programacion[j].hora_inicio),
          final: toStringHora(datos[i].programacion[j].hora_fin),
        };
        if (!requestDatos[t]) {
          requestDatos = { ...requestDatos, [t]: [] };
          fechas = { ...fechas, [t]: [] };
        }
        if (!escenarios[esc]) escenarios = { ...escenarios, [esc]: [] };
        requestDatos[t].push(aux1);
        fechas[t].push({ escenario: esc });
        escenarios[esc].push({ fechas: t });
        auxRequest.push(t);
      }
    }

    auxRequest = auxRequest.filter((item, index) => {
      return auxRequest.indexOf(item) === index;
    });
    auxRequest = auxRequest.sort();
    auxRequest = auxRequest.reverse();

    /** ordena escenaros */
    for (const i in escenarios) {
      let fechasMap = escenarios[i].map((item) => {
        return [item.fechas, item];
      });
      var fechasMapArr = new Map(fechasMap);
      let unicos = [...fechasMapArr.values()]; //

      const SortArray = (x, y) => {
        if (x.fechas < y.fechas) {
          return -1;
        }
        if (x.fechas > y.fechas) {
          return 1;
        }
        return 0;
      };
      unicos = unicos.sort(SortArray).reverse();

      escenarios = { ...escenarios, [i]: unicos };
    }

    /**  ordenas fechas */
    for (const i in fechas) {
      let fechasMap = fechas[i].map((item) => {
        return [item.escenario, item];
      });
      var fechasMapArr = new Map(fechasMap);
      let unicos = [...fechasMapArr.values()]; //

      const SortArray = (x, y) => {
        if (x.escenario < y.escenario) {
          return -1;
        }
        if (x.escenario > y.escenario) {
          return 1;
        }
        return 0;
      };
      unicos = unicos.sort(SortArray);

      fechas = { ...fechas, [i]: unicos };

    }

    //reorienta datos
    datos = {}
    let aux1 = {}
    for(const i in auxRequest){
      datos = {...datos, [auxRequest[i]]:requestDatos[auxRequest[i]]}
      aux1 = {...aux1, [auxRequest[i]]: fechas[[auxRequest[i]]]}
    }

    res.send({
      ok: true,
      body: {
        datos: datos,
        escenarios: escenarios,
        fechas: aux1,
      },      
    });
  } catch (error) {
    res.send({
      ok: false,
      mensaje: error.message || "Error en la busqueda de escenario por fecha",
      error: error,
    });
  }
};

module.exports = {
  addAutorzacion,
  searchByFechaHora,
  searchByFecha,
  searchByFechaRangoHora,
  viewProgramacion,
  initial,
};
