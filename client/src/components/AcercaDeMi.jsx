import "./AcercaDeMi.css";

const tecnologias = [
  "HTML",
  "CSS",
  "JavaScript",
  "React",
  "Vite",
  "Node.js",
  "Express",
  "MongoDB",
  "Git",
];

function AcercaDeMi() {
  return (
    <section id="acerca-de-mi" className="acerca">
      <div className="acerca-contenido">
        <h2 className="acerca-titulo">Acerca de mí</h2>

        <div className="acerca-columnas">
          <div className="acerca-texto">
            <p>
              Hola, soy Ivan. Soy desarrollador frontend y me gusta convertir ideas
              en páginas web que se vean bien y sean fáciles de usar.
            </p>
            <p>
              Trabajo principalmente con React y JavaScript, y también construyo APIs
              sencillas con Node.js y Express, como la que muestra los proyectos de
              este portafolio.
            </p>
            <p>
              Me importa que lo que hago sea claro, accesible y rápido. Siempre estoy
              aprendiendo algo nuevo y busco proyectos donde pueda seguir creciendo.
            </p>
          </div>

          <div className="acerca-tarjeta">
            <h3 className="acerca-subtitulo">Tecnologías que uso</h3>
            <ul className="acerca-tecnologias">
              {tecnologias.map((tecnologia) => (
                <li key={tecnologia} className="acerca-etiqueta">
                  {tecnologia}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AcercaDeMi;
