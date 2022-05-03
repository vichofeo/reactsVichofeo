var mongose = require("mongoose");
var Schema = mongose.Schema;
var validadorUnico = require('mongoose-unique-validator')

var escenario = new Schema({
  nombre_escenario: { type: String, unique: true, index: true },
  direccion_escenario: {type: String},
  valor_hora: {type:Number},
  espacios: [{ type: Schema.Types.ObjectId, ref: "Espacio" }],
  active: { type: Boolean, default: true }
});



escenario.plugin(validadorUnico, {mensaje: "el path no es valido {PATH}"})

escenario.query.byName = function(name){
    return this.find({nombre_escenario: name})
}

var escenarioModel = mongose.model("Escenario", escenario);
module.exports = escenarioModel;
