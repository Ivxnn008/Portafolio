import { useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Proyectos from "./components/Proyectos.jsx";
import AcercaDeMi from "./components/AcercaDeMi.jsx";
import Contacto from "./components/Contacto.jsx";
import Footer from "./components/Footer.jsx";
import LoginAdmin from "./components/LoginAdmin.jsx";
import BarraAdmin from "./components/BarraAdmin.jsx";
import Mensajes from "./components/Mensajes.jsx";

function App() {
  const [pin, setPin] = useState("");
  const [mostrarLogin, setMostrarLogin] = useState(false);

  function entrarComoAdmin(pinCorrecto) {
    setPin(pinCorrecto);
    setMostrarLogin(false);
  }

  return (
    <>
      {pin && <BarraAdmin onSalir={() => setPin("")} />}
      <Navbar />
      <main>
        <Hero />
        <Proyectos pin={pin} />
        <AcercaDeMi />
        <Contacto />
        {pin && <Mensajes pin={pin} />}
      </main>
      <Footer onAbrirLogin={() => setMostrarLogin(true)} />

      {mostrarLogin && (
        <LoginAdmin
          onEntrar={entrarComoAdmin}
          onCerrar={() => setMostrarLogin(false)}
        />
      )}
    </>
  );
}

export default App;
