import express from "express";
import mongoose from "mongoose";
import Proyecto from "../models/Proyecto.js";
import verificarPin from "../middlewares/verificarPin.js";

const router = express.Router();

function esTextoConContenido(valor, maximo) {
  return typeof valor === "string" && valor.trim() !== "" && valor.length <= maximo;
}

function esTextoOpcional(valor, maximo) {
  return valor === undefined || (typeof valor === "string" && valor.length <= maximo);
}

function validarId(req, res, next) {
  if (!mongoose.isObjectIdOrHexString(req.params.id)) {
    return res.status(404).json({ error: "Proyecto no encontrado" });
  }

  next();
}

function validarProyecto(req, res, next) {
  const { titulo, descripcion, tecnologias = [], imagen, demo, codigo } = req.body ?? {};

  if (!esTextoConContenido(titulo, 100)) {
    return res.status(400).json({ error: "El título es obligatorio (máximo 100 caracteres)" });
  }

  if (!esTextoConContenido(descripcion, 500)) {
    return res.status(400).json({ error: "La descripción es obligatoria (máximo 500 caracteres)" });
  }

  if (
    !Array.isArray(tecnologias) ||
    tecnologias.length > 20 ||
    !tecnologias.every((tecnologia) => esTextoConContenido(tecnologia, 30))
  ) {
    return res.status(400).json({ error: "Las tecnologías deben ser una lista de textos (máximo 20)" });
  }

  if (!esTextoOpcional(imagen, 300) || !esTextoOpcional(demo, 300) || !esTextoOpcional(codigo, 300)) {
    return res.status(400).json({ error: "La imagen y los enlaces deben ser textos (máximo 300 caracteres)" });
  }

  next();
}

router.get("/", async (req, res) => {
  const lista = await Proyecto.find();
  res.json(lista);
});

router.post("/", verificarPin, validarProyecto, async (req, res) => {
  const { titulo, descripcion, tecnologias = [], imagen = "", demo = "", codigo = "" } = req.body;
  const nuevo = await Proyecto.create({ titulo, descripcion, tecnologias, imagen, demo, codigo });
  res.status(201).json(nuevo);
});

router.put("/:id", verificarPin, validarId, validarProyecto, async (req, res) => {
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

router.delete("/:id", verificarPin, validarId, async (req, res) => {
  const borrado = await Proyecto.findByIdAndDelete(req.params.id);

  if (!borrado) {
    return res.status(404).json({ error: "Proyecto no encontrado" });
  }

  res.json({ mensaje: "Proyecto borrado" });
});

export default router;
