import { useState, useEffect } from "react";
import "./Navbar.css";

function Navbar() {
  const [paginaBajo, setPaginaBajo] = useState(false);

  useEffect(() => {
    function revisarScroll() {
      setPaginaBajo(window.scrollY > 0);
    }

    revisarScroll();
    window.addEventListener("scroll", revisarScroll, { passive: true });

    return () => window.removeEventListener("scroll", revisarScroll);
  }, []);

  return (
    <header className={paginaBajo ? "navbar navbar-separado" : "navbar"}>
      <a href="#inicio" className="navbar-marca">
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
            <a href="#contacto" className="navbar-enlace">Contacto</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
