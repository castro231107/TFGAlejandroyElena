import React from 'react';
import './HistorialModal.css';

// El componente recibe 'isOpen' (para saber si debe mostrarse) y 'onClose' (función para cerrarlo)
function HistorialModal({ isOpen, onClose }) {
    // Si no está abierto, devolvemos 'null' para que React no dibuje nada
    if (!isOpen) return null;

    return (
        // El fondo oscuro que aparece detrás del modal
        <div className="modal-overlay">
            <div className="modal-container">
                <div className="modal-header">
                    <h2>Historial de Movimientos</h2>
                    {/* Al hacer clic en este botón, se ejecuta la función onClose para cerrar la ventana */}
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>

                <div className="modal-body">
                    <div className="filtros-seccion">
                        <input type="date" className="filtro-input" placeholder="Fecha" />
                        <select className="filtro-input">
                            <option value="">Categoría</option>
                            <option value="Alimentación">Alimentación</option>
                            <option value="Ocio">Ocio</option>
                            <option value="Transporte">Transporte</option>
                            <option value="Vivienda">Vivienda</option>
                            <option value="Suscripciones">Suscripciones</option>
                            <option value="Otros gastos">Otros gastos</option>
                        </select>
                        <input type="text" className="filtro-input" placeholder="Concepto" />
                        <button className="btn-buscar">Buscar</button>
                    </div>

                    <div className="movimientos-lista">
                        <div className="movimiento-item">
                            <div className="movimiento-info">
                                <strong>Restaurante El Buen Sabor</strong>
                                <span>Hoy, 14:30</span>
                            </div>
                            <span className="gasto">- 25,00 €</span>
                        </div>
                        <div className="movimiento-item">
                            <div className="movimiento-info">
                                <strong>Bizum de Juan</strong>
                                <span>Ayer, 10:15</span>
                            </div>
                            <span className="ingreso">+ 15,00 €</span>
                        </div>
                        <div className="movimiento-item">
                            <div className="movimiento-info">
                                <strong>Supermercado</strong>
                                <span>03 Mayo, 19:40</span>
                            </div>
                            <span className="gasto">- 42,30 €</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HistorialModal;
