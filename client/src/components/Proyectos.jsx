import { useState, useEffect } from "react";
import "./Proyectos.css";
import FormularioProyecto from "./FormularioProyecto.jsx";

const API_URL = "http://localhost:4000";

function Proyectos({ pin }) {
  const [proyectos, setProyectos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);
  const [errorAdmin, setErrorAdmin] = useState("");
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [proyectoEditando, setProyectoEditando] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/api/proyectos`)
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error("La API respondió con un error");
        }
        return respuesta.json();
      })
      .then((datos) => setProyectos(datos))
      .catch(() => setError(true))
      .finally(() => setCargando(false));
  }, []);

  function borrarProyecto(proyecto) {
    const confirmado = window.confirm(
      `¿Seguro que quieres borrar "${proyecto.titulo}"? No se puede deshacer.`
    );
    if (!confirmado) {
      return;
    }

    setErrorAdmin("");
    fetch(`${API_URL}/api/proyectos/${proyecto._id}`, {
      method: "DELETE",
      headers: { "x-admin-pin": pin },
    })
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error("La API no pudo borrar el proyecto");
        }
        setProyectos(proyectos.filter((p) => p._id !== proyecto._id));
      })
      .catch(() =>
        setErrorAdmin(`No se pudo borrar "${proyecto.titulo}". Inténtalo de nuevo.`)
      );
  }

  function agregarALaLista(proyectoNuevo) {
    setProyectos([...proyectos, proyectoNuevo]);
    setMostrarFormulario(false);
  }

  function reemplazarEnLaLista(proyectoActualizado) {
    setProyectos(
      proyectos.map((p) => (p._id === proyectoActualizado._id ? proyectoActualizado : p))
    );
    setProyectoEditando(null);
  }

  return (
    <section id="proyectos" className="proyectos">
      <div className="proyectos-contenido">
        <h2 className="proyectos-titulo">Proyectos</h2>
        <p className="proyectos-subtitulo">
          Algunos de los trabajos que he hecho mientras aprendo.
        </p>

        {cargando && <p className="proyectos-mensaje">Cargando proyectos…</p>}

        {error && (
          <p className="proyectos-mensaje" role="alert">
            No se pudieron cargar los proyectos. Intenta recargar la página en un momento.
          </p>
        )}

        {!cargando && !error && proyectos.length === 0 && (
          <p className="proyectos-mensaje">Todavía no hay proyectos para mostrar.</p>
        )}

        {pin && (
          <button
            type="button"
            className="proyectos-boton-agregar"
            onClick={() => setMostrarFormulario(true)}
          >
            Agregar proyecto
          </button>
        )}

        {errorAdmin && (
          <p className="proyectos-error-admin" role="alert">
            {errorAdmin}
          </p>
        )}

        {mostrarFormulario && (
          <FormularioProyecto
            pin={pin}
            onGuardado={agregarALaLista}
            onCerrar={() => setMostrarFormulario(false)}
          />
        )}

        {proyectoEditando && (
          <FormularioProyecto
            pin={pin}
            proyecto={proyectoEditando}
            onGuardado={reemplazarEnLaLista}
            onCerrar={() => setProyectoEditando(null)}
          />
        )}

        <div className="proyectos-grilla">
          {proyectos.map((proyecto) => (
            <article key={proyecto._id} className="proyecto-tarjeta">
              {proyecto.imagen && (
                <img
                  src={proyecto.imagen}
                  alt={`Captura del proyecto ${proyecto.titulo}`}
                  className="proyecto-imagen"
                  width="640"
                  height="360"
                  loading="lazy"
                />
              )}

              <div className="proyecto-cuerpo">
                <h3 className="proyecto-titulo">{proyecto.titulo}</h3>
                <p className="proyecto-descripcion">{proyecto.descripcion}</p>

                <ul className="proyecto-tecnologias" aria-label="Tecnologías usadas">
                  {proyecto.tecnologias.map((tecnologia) => (
                    <li key={tecnologia} className="proyecto-etiqueta">
                      {tecnologia}
                    </li>
                  ))}
                </ul>

                <div className="proyecto-botones">
                  {proyecto.demo && (
                    <a
                      href={proyecto.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="proyecto-boton proyecto-boton-relleno"
                      aria-label={`Ver demo de ${proyecto.titulo}`}
                    >
                      Ver demo
                    </a>
                  )}
                  {proyecto.codigo && (
                    <a
                      href={proyecto.codigo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="proyecto-boton proyecto-boton-borde"
                      aria-label={`Ver código de ${proyecto.titulo}`}
                    >
                      Ver código
                    </a>
                  )}
                </div>

                {pin && (
                  <div className="proyecto-admin">
                    <button
                      type="button"
                      className="proyecto-boton-editar"
                      onClick={() => setProyectoEditando(proyecto)}
                      aria-label={`Editar ${proyecto.titulo}`}
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      className="proyecto-boton-borrar"
                      onClick={() => borrarProyecto(proyecto)}
                      aria-label={`Borrar ${proyecto.titulo}`}
                    >
                      Borrar
                    </button>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Proyectos;
