import React from 'react';
import './TarjetaModal.css';

function TarjetaModal({ isOpen, onClose, tarjeta }) {
    // tarjeta viene de la función fetch de MiCuenta
    if (!isOpen) return null;

    // Si no hay tarjeta cargada aún o es un error (el backend devuelve {message: ...} en caso de error)
    if (!tarjeta || tarjeta.message) {
        return (
            <div className="modal-overlay" onClick={onClose}>
                <div className="modal-tarjeta-container" onClick={(e) => e.stopPropagation()}>
                    <div className="credit-card error-card">
                        <p>{tarjeta?.message || "Cargando datos de la tarjeta..."}</p>
                    </div>
                    <button className="close-tarjeta-btn" onClick={onClose}>Cerrar</button>
                </div>
            </div>
        );
    }

    // El titular viene del usuario poblado (userId)
    const nombreTitular = tarjeta.userId?.nombre || "";
    const apellidosTitular = tarjeta.userId?.apellidos || "";

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-tarjeta-container" onClick={(e) => e.stopPropagation()}>
                <div className="credit-card">
                    <div className="card-chip"></div>
                    <div className="card-number">{tarjeta.numeroTarjeta}</div>
                    <div className="card-details">
                        <div className="detail-item">
                            <span className="label">TITULAR</span>
                            <span className="value">
                                {(nombreTitular + " " + apellidosTitular).toUpperCase() || "TITULAR DESCONOCIDO"}
                            </span>
                        </div>
                        <div className="detail-item">
                            <span className="label">EXP</span>
                            <span className="value">{tarjeta.fechaCaducidad}</span>
                        </div>
                        <div className="detail-item">
                            <span className="label">CVV</span>
                            <span className="value">{tarjeta.cvv}</span>
                        </div>
                    </div>
                </div>
                <button className="close-tarjeta-btn" onClick={onClose}>Cerrar</button>
            </div>
        </div>
    );
}

export default TarjetaModal;
