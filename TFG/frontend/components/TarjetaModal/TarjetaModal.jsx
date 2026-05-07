import React from 'react';
import './TarjetaModal.css';

function TarjetaModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    // Mock data for the card
    const cardData = {
        nombre: 'ALEJANDRO',
        apellido: 'CASTRO',
        numero: '4532 7812 9012 3456',
        exp: '12/28',
        cvv: '123'
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-tarjeta-container" onClick={(e) => e.stopPropagation()}>
                <div className="credit-card">
                    <div className="card-chip"></div>
                    <div className="card-number">{cardData.numero}</div>
                    <div className="card-details">
                        <div className="detail-item">
                            <span className="label">TITULAR</span>
                            <span className="value">{cardData.nombre} {cardData.apellido}</span>
                        </div>
                        <div className="detail-item">
                            <span className="label">EXP</span>
                            <span className="value">{cardData.exp}</span>
                        </div>
                        <div className="detail-item">
                            <span className="label">CVV</span>
                            <span className="value">{cardData.cvv}</span>
                        </div>
                    </div>
                </div>
                <button className="close-tarjeta-btn" onClick={onClose}>Cerrar</button>
            </div>
        </div>
    );
}

export default TarjetaModal;
