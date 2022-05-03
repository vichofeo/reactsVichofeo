var moongose = require('mongoose')
var validadorUnico = require('mongoose-unique-validator')
var Schema = moongose.Schema

var tipo_sector = new Schema({
    item_adicional: {type:String, unique: true, index: true},
    
    

})

tipo_sector.plugin(validadorUnico, {mensaje: "el path no es valido {PATH}"})

tipo_sector.query.byName = function(name){
    return this.find({item_adicional: name})
}

var tipo_sectorModel = moongose.model('ItemsAdicional', tipo_sector)
module.exports = tipo_sectorModel