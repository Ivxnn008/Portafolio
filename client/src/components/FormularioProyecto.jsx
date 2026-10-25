import { useState, useRef, useEffect } from "react";
import "./FormularioProyecto.css";

const API_URL = "http://localhost:4000";

function FormularioProyecto({ pin, proyecto, onGuardado, onCerrar }) {
  const editando = Boolean(proyecto);

  const [titulo, setTitulo] = useState(proyecto ? proyecto.titulo : "");
  const [descripcion, setDescripcion] = useState(proyecto ? proyecto.descripcion : "");
  const [tecnologias, setTecnologias] = useState(
    proyecto ? proyecto.tecnologias.join(", ") : ""
  );
  const [imagen, setImagen] = useState(proyecto ? proyecto.imagen : "");
  const [demo, setDemo] = useState(proyecto ? proyecto.demo : "");
  const [codigo, setCodigo] = useState(proyecto ? proyecto.codigo : "");
  const [estado, setEstado] = useState("inicial");

  const dialogoRef = useRef(null);

  useEffect(() => {
    const dialogo = dialogoRef.current;
    if (!dialogo.open) {
      dialogo.showModal();
    }
  }, []);

  function guardar(evento) {
    evento.preventDefault();
    setEstado("guardando");

    const listaTecnologias = tecnologias
      .split(",")
      .map((tecnologia) => tecnologia.trim())
      .filter((tecnologia) => tecnologia !== "");

    const url = editando
      ? `${API_URL}/api/proyectos/${proyecto._id}`
      : `${API_URL}/api/proyectos`;

    fetch(url, {
      method: editando ? "PUT" : "POST",
      headers: { "Content-Type": "application/json", "x-admin-pin": pin },
      body: JSON.stringify({
        titulo,
        descripcion,
        tecnologias: listaTecnologias,
        imagen,
        demo,
        codigo,
      }),
    })
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error("La API no pudo guardar el proyecto");
        }
        return respuesta.json();
      })
      .then((proyectoGuardado) => onGuardado(proyectoGuardado))
      .catch(() => setEstado("error"));
  }

  const textoBoton = editando ? "Guardar cambios" : "Guardar proyecto";

  return (
    <dialog
      ref={dialogoRef}
      className="form-proyecto"
      aria-labelledby="form-proyecto-titulo"
      onClose={onCerrar}
    >
      <form onSubmit={guardar} className="form-proyecto-formulario">
        <h2 id="form-proyecto-titulo" className="form-proyecto-titulo">
          {editando ? "Editar proyecto" : "Agregar proyecto"}
        </h2>

        <div className="form-proyecto-campo">
          <label htmlFor="fp-titulo">
            Título <span aria-hidden="true">*</span>
          </label>
          <input
            id="fp-titulo"
            type="text"
            value={titulo}
            onChange={(evento) => setTitulo(evento.target.value)}
            required
          />
        </div>

        <div className="form-proyecto-campo">
          <label htmlFor="fp-descripcion">
            Descripción <span aria-hidden="true">*</span>
          </label>
          <textarea
            id="fp-descripcion"
            rows="3"
            value={descripcion}
            onChange={(evento) => setDescripcion(evento.target.value)}
            required
          />
        </div>

        <div className="form-proyecto-campo">
          <label htmlFor="fp-tecnologias">Tecnologías</label>
          <input
            id="fp-tecnologias"
            type="text"
            value={tecnologias}
            onChange={(evento) => setTecnologias(evento.target.value)}
            aria-describedby="fp-tecnologias-ayuda"
          />
          <p id="fp-tecnologias-ayuda" className="form-proyecto-ayuda">
            Separadas por comas. Ejemplo: React, CSS, Vite
          </p>
        </div>

        <div className="form-proyecto-campo">
          <label htmlFor="fp-imagen">Imagen</label>
          <input
            id="fp-imagen"
            type="text"
            value={imagen}
            onChange={(evento) => setImagen(evento.target.value)}
            aria-describedby="fp-imagen-ayuda"
          />
          <p id="fp-imagen-ayuda" className="form-proyecto-ayuda">
            Ruta de una imagen en la carpeta public (ejemplo: /mi-proyecto.jpg) o una dirección web.
          </p>
        </div>

        <div className="form-proyecto-campo">
          <label htmlFor="fp-demo">Enlace a la demo</label>
          <input
            id="fp-demo"
            type="url"
            value={demo}
            onChange={(evento) => setDemo(evento.target.value)}
            placeholder="https://"
          />
        </div>

        <div className="form-proyecto-campo">
          <label htmlFor="fp-codigo">Enlace al código</label>
          <input
            id="fp-codigo"
            type="url"
            value={codigo}
            onChange={(evento) => setCodigo(evento.target.value)}
            placeholder="https://github.com/..."
          />
        </div>

        <p className="form-proyecto-ayuda">
          <span aria-hidden="true">*</span> Campos obligatorios
        </p>

        {estado === "error" && (
          <p className="form-proyecto-error" role="alert">
            No se pudo guardar el proyecto. Revisa que la API esté encendida e inténtalo de nuevo.
          </p>
        )}

        <div className="form-proyecto-botones">
          <button
            type="button"
            className="form-proyecto-boton form-proyecto-boton-borde"
            onClick={() => dialogoRef.current.close()}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="form-proyecto-boton form-proyecto-boton-relleno"
            disabled={estado === "guardando"}
          >
            {estado === "guardando" ? "Guardando…" : textoBoton}
          </button>
        </div>
      </form>
    </dialog>
  );
}

export default FormularioProyecto;
