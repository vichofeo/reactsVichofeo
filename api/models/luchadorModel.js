var moongose = require('mongoose')
var validadorUnico = require('mongoose-unique-validator')
var Schema = moongose.Schema

var luchador = new Schema({
    name: {type:String, unique: true, index: true},
    nombre: String,
    avatar: {type: String, default: null},
    foto: {type: String, default: null},
    musica: {type: String, default: null},

})

luchador.plugin(validadorUnico, {mensaje: "el path no es valido {PATH}"})

luchador.query.byName = function(name){
    return this.find({name: name})
}

var LuchadorModel = moongose.model('Luchador', luchador)
module.exports = LuchadorModel