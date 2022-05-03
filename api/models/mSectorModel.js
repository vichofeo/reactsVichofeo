var mongose = require("mongoose");
var Schema = mongose.Schema;
var validadorUnico = require('mongoose-unique-validator')

var sector = new Schema({
  nombre_sector: { type: String, unique: true, index: true },  
  tipo_sector: [{ type: Schema.Types.ObjectId, ref: "Tipo_sector" }],
  active: { type: Boolean, default: true }
});

sector.plugin(validadorUnico, {mensaje: "el path no es valido {PATH}"})

sector.query.byName = function(name){
    return this.find({nombre_sector: name})
}

var sectorModel = mongose.model("Sector", sector);
module.exports = sectorModel;
