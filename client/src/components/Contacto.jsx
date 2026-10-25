import { useState } from "react";
import "./Contacto.css";

const API_URL = "http://localhost:4000";

function Contacto() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");

  const [estado, setEstado] = useState("inicial");

  function enviarFormulario(evento) {
    evento.preventDefault();
    setEstado("enviando");

    fetch(`${API_URL}/api/mensajes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, email, mensaje }),
    })
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error("La API respondió con un error");
        }
        setEstado("exito");
        setNombre("");
        setEmail("");
        setMensaje("");
      })
      .catch(() => setEstado("error"));
  }

  return (
    <section id="contacto" className="contacto">
      <div className="contacto-contenido">
        <div className="contacto-intro">
          <h2 className="contacto-titulo">Contacto</h2>
          <p className="contacto-texto">
            ¿Tienes un proyecto, una propuesta y buscas con quien realizarlo con confianza?
            Escríbeme y te responderé lo antes posible.
          </p>
        </div>

        <form className="contacto-formulario" onSubmit={enviarFormulario}>
          <div className="contacto-campo">
            <label htmlFor="contacto-nombre">Nombre</label>
            <input
              id="contacto-nombre"
              type="text"
              value={nombre}
              onChange={(evento) => setNombre(evento.target.value)}
              autoComplete="name"
              required
            />
          </div>

          <div className="contacto-campo">
            <label htmlFor="contacto-email">Correo</label>
            <input
              id="contacto-email"
              type="email"
              value={email}
              onChange={(evento) => setEmail(evento.target.value)}
              autoComplete="email"
              required
            />
          </div>

          <div className="contacto-campo">
            <label htmlFor="contacto-mensaje">Mensaje</label>
            <textarea
              id="contacto-mensaje"
              rows="5"
              value={mensaje}
              onChange={(evento) => setMensaje(evento.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="contacto-boton"
            disabled={estado === "enviando"}
          >
            {estado === "enviando" ? "Enviando…" : "Enviar mensaje"}
          </button>

          {estado === "exito" && (
            <p className="contacto-aviso contacto-aviso-exito" role="status">
              ¡Gracias! Tu mensaje se envió correctamente.
            </p>
          )}

          {estado === "error" && (
            <p className="contacto-aviso contacto-aviso-error" role="alert">
              No se pudo enviar el mensaje. Revisa tu conexión e inténtalo de nuevo.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

export default Contacto;
