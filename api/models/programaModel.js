var mongose = require('mongoose')
var Schema = mongose.Schema;

var programa = new Schema({
    fecha: {type: Date, default:Date.now, unique: true},
    luchas: [{
        orden: Number, 
        lu01: [ {type: Schema.Types.ObjectId, ref:'Luchador'}],
        lu02: [{type: Schema.Types.ObjectId, ref:'Luchador'}],
    }],
    active: {type: Boolean, default: true}
})

//virtuales
programa.virtual('izquierda').get(function(){
    return this.pr.length
})

var ProgramaModel =  mongose.model('Programa', programa)
module.exports = ProgramaModel