import "./Hero.css";

function Hero() {
  return (
    <section id="inicio" className="hero">
      <div className="hero-contenido">
        <div className="hero-texto">
          <div className="hero-titulos">
            <h1 className="hero-nombre">Ivan Garcia</h1>
            <p className="hero-rol">Desarrollador Frontend</p>
          </div>

          <p className="hero-descripcion">
            Soy un desarrollador web, vibecoder junior con más de 1 año de experiencia en el mundo del desarrollo. Manejo más de 4 lenguajes de programación, especializándome más en el Frontend y en la experiencia de usuario.
          </p>

          <div className="hero-botones">
            <a href="#proyectos" className="hero-boton hero-boton-borde">
              Ver proyectos
            </a>
            <a href="#contacto" className="hero-boton hero-boton-relleno">
              Contactar
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
