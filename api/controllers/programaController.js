var luchadorModel = require("../models/luchadorModel");
var programaModel = require("../models/programaModel");


const addPrograma = async (req, res, err) => {
  try {
    let programa = Object.entries(req.body);
    let aux = [];
    for (let i = 0; i < programa.length; i++) {
      let lu01 = [];
      if (programa[i][1].lu01) {
        for (let j = 0; j < programa[i][1].lu01.length; j++) {
          lu01[j] = programa[i][1].lu01[j].id;
        }
      } else lu01 = null;

      let lu02 = [];

      if (programa[i][1].lu02) {
        for (let j = 0; j < programa[i][1].lu02.length; j++) {
          lu02[j] = programa[i][1].lu02[j].id;
        }
      } else lu02 = null;

      aux[i] = {
        orden: programa[i][1].orden,
        lu01: lu01,
        lu02: lu02,
      };
    }

    let newPrograma = new programaModel({
      luchas: aux,
    });

    newPrograma = await newPrograma.save();
    //introduce los demas elementos

    res.send({
      ok: true,
      mensaje: "guardado exitoso",
      programa: aux,
    });
  } catch (error) {
    let mensaje = "falla en el guardadro de programa";

    res.send({
      ok: false,
      mensaje: "falla en la creacion de program",
      error: error.message,
    });
  }
};

const viewProgram = async (req, res, err) => {
  try {
    let programa = await programaModel
      .findOne({ active: true })
      .populate(["luchas.lu01", "luchas.lu02"])
      .sort({ fecha: -1 });

    if (programa === null) throw new Error("No existe el programacion Activa");

    let response = {
      fecha: programa.fecha,
      luchas: programa.luchas.map((i) => {
        return {
          orden: i.orden,
        };
      }),
    };

    res.send({
      ok: true,
      body: programa,
    });
  } catch (error) {
    res.send({
      ok: false,
      mensaje: error.message || "Error en el pedido de los datos de luchadores",
      error: error,
    });
  }
};

function zfill(number, width) {
  var numberOutput = Math.abs(number); /* Valor absoluto del número */
  var length = number.toString().length; /* Largo del número */
  var zero = "0"; /* String de cero */

  if (width <= length) {
    if (number < 0) {
      return "-" + numberOutput.toString();
    } else {
      return numberOutput.toString();
    }
  } else {
    if (number < 0) {
      return "-" + zero.repeat(width - length) + numberOutput.toString();
    } else {
      return zero.repeat(width - length) + numberOutput.toString();
    }
  }
}

const getProgramUltime = async (req, res, err) => {
  try {
    let programa = await programaModel
      .findOne({ active: true })
      .populate(["luchas.lu01", "luchas.lu02"])
      .sort({ fecha: -1 });
    
    let luchadores = await luchadorModel.find({}).sort({ name: 1 });
    let luchadoresExclude = luchadores.map((i) => {
      return {
        _id: i._id,
        id: i._id,
        content: i.name,        
        avatar: i.avatar,
      };
    });

    if (programa === null) throw new Error("No existe el programacion Activa");

    let datos = { fecha: programa.fecha };
    let luchas = programa.luchas;
    let aux = [];
    let index = 1;
    let newState = {};
    for (let i = 0; i < luchas.length; i++) {
      //busca luchador

      var temp = zfill(index, 2);
      aux = luchas[i].lu01.map((ob) => {
        //luchadoresExclude = luchadoresExclude.filter((lucha) => lucha.name !==ob.name)
        return {
          _id: ob._id,
          id: ob._id,
          content: ob.name,
          
        };
      });
      newState = {
        ...newState,
        [`var${temp}`]: { items: aux },
      };
      //setColumns(newState)
      index++;
      temp = zfill(index, 2);
      aux = luchas[i].lu02.map((ob) => {
        return {
          id: ob._id,
          content: ob.name,
          
        };
      });

      newState = {
        ...newState,
        [`var${temp}`]: { items: aux },
      };
      //setColumns(newState)

      index++;
    }

    //filtra luchadores existentes

    Object.values(newState).forEach(item => {
      console.log(item)
      luchadoresExclude= luchadoresExclude.filter(lucha => lucha.name !== item.content)
    })

    res.send({
      ok: true,
      body: { datos: datos, estado: newState, luchadores: luchadoresExclude },
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
  addPrograma,
  viewProgram,
  getProgramUltime,
};
