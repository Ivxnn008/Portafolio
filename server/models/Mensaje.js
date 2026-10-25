import mongoose from "mongoose";

const mensajeSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    email: { type: String, required: true },
    mensaje: { type: String, required: true },
    fecha: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

const Mensaje = mongoose.model("Mensaje", mensajeSchema);

export default Mensaje;
