import "./Navbar.css";

function Navbar() {
  return (
    <header className="navbar">
      <a href="#inicio" className="navbar-marca">
        <img
          src="/foto-perfil.jpg"
          alt="Foto de perfil de Ivan Garcia"
          className="navbar-foto"
          width="44"
          height="44"
        />
        <span className="navbar-nombre">Ivan Garcia</span>
      </a>

      <nav aria-label="Navegación principal">
        <ul className="navbar-enlaces">
          <li>
            <a href="#inicio" className="navbar-enlace">Inicio</a>
          </li>
          <li>
            <a href="#proyectos" className="navbar-enlace">Proyectos</a>
          </li>
          <li>
            <a href="#acerca-de-mi" className="navbar-enlace">Acerca de mí</a>
          </li>
          <li>
            <a href="#hobbies" className="navbar-enlace">Hobbies</a>
          </li>
          <li>
            <a href="#contacto" className="navbar-enlace">Contacto</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
