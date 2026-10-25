import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Proyectos from "./components/Proyectos.jsx";
import AcercaDeMi from "./components/AcercaDeMi.jsx";
import Contacto from "./components/Contacto.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Proyectos />
        <AcercaDeMi />
        <Contacto />
      </main>
      <Footer />
    </>
  );
}

export default App;
