var luchadorModel = require("../models/luchadorModel");
var programaModel = require("../models/programaModel");

const conversionProgram = (datos) => {
  let programa = Object.entries(datos);
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
  return aux;
};

const addPrograma = async (req, res, err) => {
  try {
    let aux = conversionProgram(req.body.luchas);

    let newPrograma = new programaModel({
      name: req.body.name,
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

const updatePrograma = async (req, res, err) => {
  try {
    let identificador = req.body._id;
    let aux = conversionProgram(req.body.luchas);

    const update = {
      name: req.body.name,
      luchas: aux,
    };
    let response = await programaModel.updateOne(
      { _id: identificador },
      update
    );

    res.send({
      ok: true,
    });
  } catch (error) {
    res.send({
      ok: false,
      mensaje: error.message || "Error al actulizar el perfil",
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
      name: programa.name,
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
    let id = req.params.id
    let programa = await programaModel
      .findOne({ active: true, _id: id })
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

    let datos = { _id: programa._id, name: programa.name, fecha: programa.fecha };
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
          avatar: ob.avatar,
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
          _id: ob._id,
          id: ob._id,
          content: ob.name,
          avatar: ob.avatar,
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

    Object.values(newState).forEach((item) => {
      item.items.forEach((value) => {
        //luchadoresExclude= luchadoresExclude.find(lucha => lucha.name !== value.content)
        luchadoresExclude = luchadoresExclude.filter(
          (lucha) => lucha.content !== value.content
        );
      });
    });
    newState = { ...newState, var00: { items: luchadoresExclude } };

    res.send({
      ok: true,
      body: { datos: datos, estado: newState },
    });
  } catch (error) {
    res.send({
      ok: false,
      mensaje: error.message || "Error en el pedido de los datos de luchadores",
      error: error,
    });
  }
};
const getPrograms = async (req, res, err) => {
  try {
    let programa = await programaModel
      .find({ active: true }, { name: 1 })
      .sort({ name: 1 });

    if (programa === null) throw new Error("No existe el programacion Activa");

    let response = programa.map(obj => {
      return (
        {
          value: obj._id,//{ id: obj._id, name: obj.name },
          label: obj.name
        })
    })

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
module.exports = {
  addPrograma,
  updatePrograma,
  viewProgram,
  getProgramUltime,
  getPrograms
};
