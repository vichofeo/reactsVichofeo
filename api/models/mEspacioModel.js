var moongose = require('mongoose')
var validadorUnico = require('mongoose-unique-validator')
var Schema = moongose.Schema

var espacio = new Schema({
    nombre_espacio: {type:String, unique: true, index: true}
    

})

espacio.plugin(validadorUnico, {mensaje: "el path no es valido {PATH}"})

espacio.query.byName = function(name){
    return this.find({nombre_espacio: name})
}

var espacioModel = moongose.model('Espacio', espacio)
module.exports = espacioModel