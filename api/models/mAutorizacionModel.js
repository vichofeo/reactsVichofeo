var mongose = require("mongoose");
var Schema = mongose.Schema;

var autorizacion = new Schema({
  codigo: {type: String, unique: true, index: true},
  persona: { type: String },
  cite: { type: String },
  organizacion: { type: String },
  telefono: { type: String },
  sector: { type: String },
  tsector: { type: String },
  escenario_id: { type: Schema.Types.ObjectId, ref: "Escenario" },
  escenario: { type: String },
  tescenario: { type: String },
  fecha_reserva: { type: Date, default: Date.now },
  
  programacion: [
    {
      fecha: { type: Date },
      hora_inicio: { type: Date },
      hora_fin: { type: Date },
      duracion: { type: Number },
    },
  ],
  descripcion_actividad: { type: String },
  observaciones: { type: String },
  servicios: {},
  segmentos: [
    {
      adicional_id: {
        type: Schema.Types.ObjectId,
        ref: "itemsAdicional",
        default: null,
      },
      segmento: { type: String },
      valor_hora: { type: Number },
      total_horas: { type: Number },
      canje: { type: Number },
      exoneracion: { type: Boolean },
      descuentos: { type: Number },
      total: { type: Number },
    },
  ],
  costo_total: { type: Number },
  fstart: { type: Date },
  fend: { type: Date },
  active: { type: Boolean, default: true },
  estado: {
    type: String,
    enum : ['Reservado','Pagado'],
    default: 'Reservado'
},
});

/*
// Establecemos un campo virtual
autorizacion.virtual('programacion[fecha2]')
  .set(function(fecha) {
    // El formato esperado es 'yyyy-mm-dd' que es el devuelto por el campo input
    // el valor recibido se almacenará en el campo fecha_nacimiento_iso de nuestro documento
    this.hora_inicio = new Date(fecha);
  })
  .get(function(){
    // el valor devuelto será un string en formato 'yyyy-mm-dd'
    return this.hora_inicio.toISOString().substring(0,10);
  });
*/
var autorizacionModel = mongose.model("autorizacion", autorizacion);
module.exports = autorizacionModel;
