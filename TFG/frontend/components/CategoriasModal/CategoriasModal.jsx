import React from 'react';
import './CategoriasModal.css';

// El componente recibe 'isOpen' (indica si está visible) y 'onClose' (función para esconderlo)
function CategoriasModal({ isOpen, onClose }) {
    // Si la propiedad isOpen es falsa, no renderizamos el contenido
    if (!isOpen) return null;

    return (
        // Capa semitransparente que cubre la pantalla principal
        <div className="modal-overlay">
            <div className="modal-container">
                <div className="modal-header">
                    <h2>Gastos por Categorías</h2>
                    {/* Botón para cerrar la ventana. onClick llama a la función onClose */}
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>

                <div className="modal-body">
                    <div className="promedio-diario-card">
                        <h3>Promedio Diario</h3>
                        <p className="promedio-cantidad">24,50 €</p>
                        <span className="promedio-desc">Basado en los últimos 30 días</span>
                    </div>

                    <div className="gastos-mensuales-seccion">
                        <h3 className="seccion-titulo">Gastos Mensuales (Agrupados)</h3>

                        <div className="lista-categorias">
                            <div className="categoria-item">
                                <div className="categoria-info">
                                    <div className="categoria-icono comida">🍔</div>
                                    <span>Comida y Restaurantes</span>
                                </div>
                                <span className="categoria-gasto">350,00 €</span>
                            </div>

                            <div className="categoria-item">
                                <div className="categoria-info">
                                    <div className="categoria-icono transporte">🚗</div>
                                    <span>Transporte</span>
                                </div>
                                <span className="categoria-gasto">120,00 €</span>
                            </div>

                            <div className="categoria-item">
                                <div className="categoria-info">
                                    <div className="categoria-icono ocio">🎬</div>
                                    <span>Ocio y Entretenimiento</span>
                                </div>
                                <span className="categoria-gasto">150,00 €</span>
                            </div>

                            <div className="categoria-item">
                                <div className="categoria-info">
                                    <div className="categoria-icono hogar">🏠</div>
                                    <span>Hogar y Facturas</span>
                                </div>
                                <span className="categoria-gasto">400,00 €</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CategoriasModal;
