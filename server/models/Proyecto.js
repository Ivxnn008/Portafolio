import mongoose from "mongoose";

const proyectoSchema = new mongoose.Schema(
  {
    titulo: { type: String, required: true },
    descripcion: { type: String, required: true },
    tecnologias: { type: [String], default: [] },
    imagen: { type: String, default: "" },
    demo: { type: String, default: "" },
    codigo: { type: String, default: "" },
  },
  { versionKey: false }
);

const Proyecto = mongoose.model("Proyecto", proyectoSchema);

export default Proyecto;
