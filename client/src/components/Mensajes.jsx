import { useState, useEffect } from "react";
import "./Mensajes.css";

const API_URL = "http://localhost:4000";

function formatearFecha(fechaISO) {
  return new Date(fechaISO).toLocaleString("es", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function Mensajes({ pin }) {
  const [mensajes, setMensajes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);
  const [actualizaciones, setActualizaciones] = useState(0);

  useEffect(() => {
    fetch(`${API_URL}/api/mensajes`, {
      headers: { "x-admin-pin": pin },
    })
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error("La API no devolvió los mensajes");
        }
        return respuesta.json();
      })
      .then((datos) => {
        setMensajes([...datos].reverse());
        setError(false);
      })
      .catch(() => setError(true))
      .finally(() => setCargando(false));
  }, [pin, actualizaciones]);

  function actualizar() {
    setCargando(true);
    setActualizaciones(actualizaciones + 1);
  }

  return (
    <section id="mensajes" className="mensajes" aria-labelledby="mensajes-titulo">
      <div className="mensajes-contenido">
        <div className="mensajes-encabezado">
          <h2 id="mensajes-titulo" className="mensajes-titulo">
            Mensajes recibidos
          </h2>
          <button
            type="button"
            className="mensajes-boton"
            onClick={actualizar}
            disabled={cargando}
          >
            {cargando ? "Cargando…" : "Actualizar"}
          </button>
        </div>
        <p className="mensajes-privado">Solo tú puedes ver esta sección.</p>

        {error && (
          <p className="mensajes-error" role="alert">
            No se pudieron cargar los mensajes. Revisa que la API esté encendida y pulsa Actualizar.
          </p>
        )}

        {!cargando && !error && mensajes.length === 0 && (
          <p className="mensajes-vacio">Todavía no has recibido mensajes.</p>
        )}

        <ul className="mensajes-lista">
          {mensajes.map((mensaje) => (
            <li key={mensaje._id} className="mensaje">
              <div className="mensaje-cabecera">
                <p className="mensaje-nombre">{mensaje.nombre}</p>
                <time dateTime={mensaje.fecha} className="mensaje-fecha">
                  {formatearFecha(mensaje.fecha)}
                </time>
              </div>
              <a href={`mailto:${mensaje.email}`} className="mensaje-email">
                {mensaje.email}
              </a>
              <p className="mensaje-texto">{mensaje.mensaje}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Mensajes;
