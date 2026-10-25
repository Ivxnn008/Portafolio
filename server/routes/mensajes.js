import express from "express";
import { rateLimit } from "express-rate-limit";
import Mensaje from "../models/Mensaje.js";
import verificarPin from "../middlewares/verificarPin.js";

const router = express.Router();

const limiteMensajes = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  message: { error: "Enviaste demasiados mensajes. Espera 15 minutos." },
});

function esTextoConContenido(valor, maximo) {
  return typeof valor === "string" && valor.trim() !== "" && valor.length <= maximo;
}

function validarMensaje(req, res, next) {
  const { nombre, email, mensaje } = req.body ?? {};

  if (!esTextoConContenido(nombre, 100)) {
    return res.status(400).json({ error: "El nombre es obligatorio (máximo 100 caracteres)" });
  }

  if (!esTextoConContenido(email, 200) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "El correo no es válido" });
  }

  if (!esTextoConContenido(mensaje, 2000)) {
    return res.status(400).json({ error: "El mensaje es obligatorio (máximo 2000 caracteres)" });
  }

  next();
}

router.post("/", limiteMensajes, validarMensaje, async (req, res) => {
  const { nombre, email, mensaje } = req.body;
  const nuevo = await Mensaje.create({ nombre, email, mensaje });
  res.status(201).json(nuevo);
});

router.get("/", verificarPin, async (req, res) => {
  const lista = await Mensaje.find().sort({ fecha: 1 });
  res.json(lista);
});

export default router;
