import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch((error) => console.log("❌ Error al conectar a MongoDB:", error.message));

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

app.post("/api/login", verificarPin, (req, res) => {
  res.json({ mensaje: "Bienvenido, administrador" });
});

const proyectos = [
  {
    _id: "1",
    titulo: "Portafolio personal",
    descripcion: "Mi portafolio hecho con React y una API propia en Express.",
    tecnologias: ["React", "Vite", "Node.js", "Express"],
    imagen: "/proyecto-portafolio.jpg",
    demo: "",
    codigo: "https://github.com/Ivxnn008/Portafolio",
  },
  {
    _id: "2",
    titulo: "Lista de tareas",
    descripcion: "Aplicación para agregar, completar y borrar tareas.",
    tecnologias: ["HTML", "CSS", "JavaScript"],
    imagen: "/proyecto-tareas.jpg",
    demo: "",
    codigo: "",
  },
];

let siguienteId = 3;

app.get("/api/proyectos", (req, res) => {
  res.json(proyectos);
});

app.post("/api/proyectos", verificarPin, (req, res) => {
  const { titulo, descripcion, tecnologias = [], imagen = "", demo = "", codigo = "" } = req.body;
  const nuevo = { _id: String(siguienteId), titulo, descripcion, tecnologias, imagen, demo, codigo };
  siguienteId++;
  proyectos.push(nuevo);
  res.status(201).json(nuevo);
});

app.put("/api/proyectos/:id", verificarPin, (req, res) => {
  const indice = proyectos.findIndex((proyecto) => proyecto._id === req.params.id);

  if (indice === -1) {
    return res.status(404).json({ error: "Proyecto no encontrado" });
  }

  const { titulo, descripcion, tecnologias = [], imagen = "", demo = "", codigo = "" } = req.body;
  proyectos[indice] = { _id: req.params.id, titulo, descripcion, tecnologias, imagen, demo, codigo };
  res.json(proyectos[indice]);
});

app.delete("/api/proyectos/:id", verificarPin, (req, res) => {
  const indice = proyectos.findIndex((proyecto) => proyecto._id === req.params.id);

  if (indice === -1) {
    return res.status(404).json({ error: "Proyecto no encontrado" });
  }

  proyectos.splice(indice, 1);
  res.json({ mensaje: "Proyecto borrado" });
});

const mensajes = [];

let siguienteIdMensaje = 1;

app.post("/api/mensajes", (req, res) => {
  const { nombre, email, mensaje } = req.body;
  const nuevo = {
    _id: String(siguienteIdMensaje),
    nombre,
    email,
    mensaje,
    fecha: new Date().toISOString(),
  };
  siguienteIdMensaje++;
  mensajes.push(nuevo);
  res.status(201).json(nuevo);
});

app.get("/api/mensajes", verificarPin, (req, res) => {
  res.json(mensajes);
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
