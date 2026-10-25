import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Proyecto from "./models/Proyecto.js";
import rutasLogin from "./routes/login.js";
import rutasProyectos from "./routes/proyectos.js";
import rutasMensajes from "./routes/mensajes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

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

mongoose.set("sanitizeFilter", true);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Conectado a MongoDB");
    return cargarProyectosDeEjemplo();
  })
  .catch((error) => console.log("❌ Error al conectar a MongoDB:", error.message));

app.use(cors());

app.use(express.json({ limit: "10kb" }));

app.get("/api/prueba", (req, res) => {
  res.json({ mensaje: "¡La API del portafolio funciona!" });
});

app.use("/api/login", rutasLogin);
app.use("/api/proyectos", rutasProyectos);
app.use("/api/mensajes", rutasMensajes);

app.use((error, req, res, next) => {
  const estado = error.status || 500;

  if (estado === 500) {
    console.log("❌ Error en la API:", error.message);
  }

  res.status(estado).json({
    error: estado === 500 ? "Error del servidor" : "La petición no es válida",
  });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
