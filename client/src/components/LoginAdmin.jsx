import { useState, useRef, useEffect } from "react";
import "./LoginAdmin.css";

const API_URL = "http://localhost:4000";

function LoginAdmin({ onEntrar, onCerrar }) {
  const [pin, setPin] = useState("");
  const [estado, setEstado] = useState("inicial");

  const dialogoRef = useRef(null);

  useEffect(() => {
    const dialogo = dialogoRef.current;
    if (!dialogo.open) {
      dialogo.showModal();
    }
  }, []);

  function comprobarPin(evento) {
    evento.preventDefault();
    setEstado("enviando");

    fetch(`${API_URL}/api/login`, {
      method: "POST",
      headers: { "x-admin-pin": pin },
    })
      .then((respuesta) => {
        if (respuesta.ok) {
          onEntrar(pin);
        } else if (respuesta.status === 429) {
          setEstado("demasiados-intentos");
        } else {
          setEstado("pin-incorrecto");
        }
      })
      .catch(() => setEstado("sin-conexion"));
  }

  return (
    <dialog
      ref={dialogoRef}
      className="login"
      aria-labelledby="login-titulo"
      onClose={onCerrar}
    >
      <form onSubmit={comprobarPin} className="login-formulario">
        <h2 id="login-titulo" className="login-titulo">Modo administrador</h2>

        <div className="login-campo">
          <label htmlFor="login-pin">PIN</label>
          <input
            id="login-pin"
            type="password"
            value={pin}
            onChange={(evento) => setPin(evento.target.value)}
            autoComplete="current-password"
            required
          />
        </div>

        {estado === "pin-incorrecto" && (
          <p className="login-error" role="alert">
            PIN incorrecto. Inténtalo de nuevo.
          </p>
        )}

        {estado === "demasiados-intentos" && (
          <p className="login-error" role="alert">
            Demasiados intentos. Espera 15 minutos antes de volver a probar.
          </p>
        )}

        {estado === "sin-conexion" && (
          <p className="login-error" role="alert">
            No se pudo conectar con la API. ¿Está encendido el servidor?
          </p>
        )}

        <div className="login-botones">
          <button
            type="button"
            className="login-boton login-boton-borde"
            onClick={() => dialogoRef.current.close()}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="login-boton login-boton-relleno"
            disabled={estado === "enviando"}
          >
            {estado === "enviando" ? "Comprobando…" : "Entrar"}
          </button>
        </div>
      </form>
    </dialog>
  );
}

export default LoginAdmin;
