import "./BarraAdmin.css";

function BarraAdmin({ onSalir }) {
  return (
    <div className="barra-admin">
      <p className="barra-admin-texto" role="status">
        Modo administrador activo
      </p>
      <div className="barra-admin-acciones">
        <a href="#mensajes" className="barra-admin-enlace">
          Ver mensajes
        </a>
        <button type="button" className="barra-admin-boton" onClick={onSalir}>
          Salir
        </button>
      </div>
    </div>
  );
}

export default BarraAdmin;
