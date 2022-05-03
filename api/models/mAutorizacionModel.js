var mongose = require("mongoose");
var Schema = mongose.Schema;

var autorizacion = new Schema({
  organizacion: { type: String},
  telefono: { type: String},
  sector: { type: Schema.Types.ObjectId, ref: "Sector" },
  espacio: { type: Schema.Types.ObjectId, ref: "Espacio" },
  fecha_reserva: { type: Date, default: Date.now },
  fechas_utilizacion: [{ type: Date }],
  programacion: [
    {
      fecha: { type: Date },
      hora_inicio: { type: Date },
      hora_fin: { type: Date },
      duracion: { type: Number },
    },
  ],
  descripcion_actividad: { type: String },
  alquiler: {
    valor_hora: { type: Number },
    total_horas: { type: Number },
    canje: { type: Number },
    exoneracion: { type: Number },
    descuentos: { type: Number },
    total: { type: Number },
  },
  active: { type: Boolean, default: true },
});

var autorizacionModel = mongose.model("autorizacion", autorizacion);
module.exports = autorizacionModel;
