import express from "express";
import { rateLimit } from "express-rate-limit";
import verificarPin from "../middlewares/verificarPin.js";

const router = express.Router();

const limiteLogin = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  message: { error: "Demasiados intentos. Espera 15 minutos." },
});

router.post("/", limiteLogin, verificarPin, (req, res) => {
  res.json({ mensaje: "Bienvenido, administrador" });
});

export default router;
