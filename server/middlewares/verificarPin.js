function verificarPin(req, res, next) {
  const pin = req.headers["x-admin-pin"];

  if (!process.env.ADMIN_PIN || pin !== process.env.ADMIN_PIN) {
    return res.status(401).json({ error: "PIN incorrecto" });
  }

  next();
}

export default verificarPin;
