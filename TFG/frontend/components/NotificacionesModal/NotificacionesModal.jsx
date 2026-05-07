import React from 'react';
import './NotificacionesModal.css';

function NotificacionesModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    // Mock data for incomes (ingresos)
    const ingresos = [
        { id: 1, origen: 'Nómina Mayo', fecha: '05 Mayo, 2026', cantidad: 2100.00 },
        { id: 2, origen: 'Bizum de Elena', fecha: '03 Mayo, 2026', cantidad: 45.50 },
        { id: 3, origen: 'Venta Wallapop', fecha: '30 Abril, 2026', cantidad: 120.00 },
        { id: 4, origen: 'Devolución Amazon', fecha: '25 Abril, 2026', cantidad: 19.99 },
    ];

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <div className="modal-header">
                    <h2>Notificaciones de Ingresos</h2>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>
                <div className="modal-body">
                    <div className="ingresos-lista">
                        {ingresos.map((ingreso) => (
                            <div key={ingreso.id} className="ingreso-item">
                                <div className="ingreso-info">
                                    <strong>{ingreso.origen}</strong>
                                    <span>{ingreso.fecha}</span>
                                </div>
                                <span className="cantidad-positiva">+ {ingreso.cantidad.toFixed(2)} €</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NotificacionesModal;
