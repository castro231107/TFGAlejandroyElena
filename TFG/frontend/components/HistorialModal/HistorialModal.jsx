import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./HistorialModal.css";

// El componente recibe 'isOpen' y 'onClose'
function HistorialModal({ isOpen, onClose }) {
  const { id } = useParams();

  const [movimientos, setMovimientos] = useState([]);
  const [fechaFiltro, setFechaFiltro] = useState("");
  const [categoriaFiltro, setCategoriaFiltro] = useState("");
  const [conceptoFiltro, setConceptoFiltro] = useState("");
  const [filtrosAplicados, setFiltrosAplicados] = useState(null);

  const limpiarFiltros = () => {
    setFechaFiltro("");
    setCategoriaFiltro("");
    setConceptoFiltro("");
    setFiltrosAplicados(null);
  };

  // =========================
  // CARGAR MOVIMIENTOS REALES
  // =========================
  useEffect(() => {
    if (isOpen) {
      fetch(`http://localhost:3000/api/movimientos/${id}`)
        .then((res) => res.json())
        .then((data) => setMovimientos(data))
        .catch((err) => console.error("Error cargando movimientos:", err));
    }
  }, [isOpen, id]);

  if (!isOpen) return null;

  // =========================
  // FILTROS
  // =========================
  const movimientosFiltrados = movimientos.filter((mov) => {
    if (!filtrosAplicados) return true;

    const fechaMov = new Date(mov.fecha).toISOString().split("T")[0];

    const coincideFecha =
      !filtrosAplicados.fechaFiltro ||
      fechaMov === filtrosAplicados.fechaFiltro;

    const coincideCategoria =
      !filtrosAplicados.categoriaFiltro ||
      mov.categoria === filtrosAplicados.categoriaFiltro;

    const coincideConcepto =
      !filtrosAplicados.conceptoFiltro ||
      mov.comercio
        .toLowerCase()
        .includes(filtrosAplicados.conceptoFiltro.toLowerCase());

    return coincideFecha && coincideCategoria && coincideConcepto;
  });

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>Historial de Movimientos</h2>
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
        </div>

        <div className="modal-body">
          <div className="filtros-seccion">
            <input
              type="date"
              className="filtro-input"
              value={fechaFiltro || ""}
              onChange={(e) => setFechaFiltro(e.target.value)}
            />

            <select
              className="filtro-input"
              value={categoriaFiltro}
              onChange={(e) => setCategoriaFiltro(e.target.value)}
            >
              <option value="">Categoría</option>
              <option value="alimentacion">Alimentación</option>
              <option value="ocio">Ocio</option>
              <option value="transporte">Transporte</option>
              <option value="vivienda">Vivienda</option>
              <option value="suscripciones">Suscripciones</option>
              <option value="otros">Otros</option>
            </select>

            <input
              type="text"
              className="filtro-input"
              placeholder="Concepto"
              value={conceptoFiltro}
              onChange={(e) => setConceptoFiltro(e.target.value)}
            />

            <button
              className="btn-buscar"
              onClick={() =>
                setFiltrosAplicados({
                  fechaFiltro,
                  categoriaFiltro,
                  conceptoFiltro,
                })
              }
            >
              Buscar
            </button>

            <button onClick={limpiarFiltros}>Limpiar filtros</button>
          </div>

          <div className="movimientos-lista">
            {movimientosFiltrados.map((mov) => {
              // Si el usuario actual es receptor → ingreso
              const esIngreso = String(mov.toUserId?._id) === String(id);
              //“¿El usuario actual (id) es el destinatario (toUserId) de este movimiento?”
              //si es asi entonces es un ingreso y si no es asi entonces es un gasto

              return (
                <div key={mov._id} className="movimiento-item">
                  <div className="movimiento-info">
                    <strong>{mov.comercio}</strong>

                    <span>
                      {new Date(mov.fecha).toLocaleString("es-ES", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <span className={esIngreso ? "ingreso" : "gasto"}>
                    {esIngreso ? "+" : "-"} {mov.cantidad.toFixed(2)} €
                  </span>
                </div>
              );
            })}

            {movimientosFiltrados.length === 0 && (
              <div className="movimiento-item">
                <div className="movimiento-info">
                  <strong>No hay movimientos</strong>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HistorialModal;
