import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

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

const proyectosDeEjemplo = [
  {
    titulo: "Portafolio personal",
    descripcion: "Mi portafolio hecho con React y una API propia en Express.",
    tecnologias: ["React", "Vite", "Node.js", "Express"],
    imagen: "/proyecto-portafolio.jpg",
    demo: "",
    codigo: "https://github.com/Ivxnn008/Portafolio",
  },
  {
    titulo: "Lista de tareas",
    descripcion: "Aplicación para agregar, completar y borrar tareas.",
    tecnologias: ["HTML", "CSS", "JavaScript"],
    imagen: "/proyecto-tareas.jpg",
    demo: "",
    codigo: "",
  },
];

async function cargarProyectosDeEjemplo() {
  const cantidad = await Proyecto.countDocuments();

  if (cantidad === 0) {
    await Proyecto.insertMany(proyectosDeEjemplo);
    console.log("Proyectos de ejemplo cargados en la base de datos");
  }
}

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Conectado a MongoDB");
    return cargarProyectosDeEjemplo();
  })
  .catch((error) => console.log("❌ Error al conectar a MongoDB:", error.message));

app.use(cors());

app.use(express.json());

app.get("/api/prueba", (req, res) => {
  res.json({ mensaje: "¡La API del portafolio funciona!" });
});

function verificarPin(req, res, next) {
  const pin = req.headers["x-admin-pin"];

  if (!process.env.ADMIN_PIN || pin !== process.env.ADMIN_PIN) {
    return res.status(401).json({ error: "PIN incorrecto" });
  }

  next();
}

function validarId(req, res, next) {
  if (!mongoose.isObjectIdOrHexString(req.params.id)) {
    return res.status(404).json({ error: "Proyecto no encontrado" });
  }

  next();
}

app.post("/api/login", verificarPin, (req, res) => {
  res.json({ mensaje: "Bienvenido, administrador" });
});

app.get("/api/proyectos", async (req, res) => {
  const lista = await Proyecto.find();
  res.json(lista);
});

app.post("/api/proyectos", verificarPin, async (req, res) => {
  const { titulo, descripcion, tecnologias = [], imagen = "", demo = "", codigo = "" } = req.body;
  const nuevo = await Proyecto.create({ titulo, descripcion, tecnologias, imagen, demo, codigo });
  res.status(201).json(nuevo);
});

app.put("/api/proyectos/:id", verificarPin, validarId, async (req, res) => {
  const { titulo, descripcion, tecnologias = [], imagen = "", demo = "", codigo = "" } = req.body;
  const actualizado = await Proyecto.findByIdAndUpdate(
    req.params.id,
    { titulo, descripcion, tecnologias, imagen, demo, codigo },
    { returnDocument: "after", runValidators: true }
  );

  if (!actualizado) {
    return res.status(404).json({ error: "Proyecto no encontrado" });
  }

  res.json(actualizado);
});

app.delete("/api/proyectos/:id", verificarPin, validarId, async (req, res) => {
  const borrado = await Proyecto.findByIdAndDelete(req.params.id);

  if (!borrado) {
    return res.status(404).json({ error: "Proyecto no encontrado" });
  }

  res.json({ mensaje: "Proyecto borrado" });
});

app.post("/api/mensajes", async (req, res) => {
  const { nombre, email, mensaje } = req.body;
  const nuevo = await Mensaje.create({ nombre, email, mensaje });
  res.status(201).json(nuevo);
});

app.get("/api/mensajes", verificarPin, async (req, res) => {
  const lista = await Mensaje.find().sort({ fecha: 1 });
  res.json(lista);
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
