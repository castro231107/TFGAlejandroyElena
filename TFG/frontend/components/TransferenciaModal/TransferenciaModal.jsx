import React from 'react';
import './TransferenciaModal.css';

// El componente recibe 'isOpen' (para saber si debe mostrarse) y 'onClose' (función para cerrarlo)
function TransferenciaModal({ isOpen, onClose }) {
    // Si isOpen es falso, detenemos la ejecución y no mostramos nada
    if (!isOpen) return null;

    return (
        // Contenedor principal que oscurece el fondo de la pantalla
        <div className="modal-overlay">
            <div className="modal-container">
                <div className="modal-header">
                    <h2>Nueva Transferencia</h2>
                    {/* Botón con el símbolo "X" (&times;). Al hacer clic ejecuta onClose para cerrar el modal */}
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>
                
                <div className="modal-body">
                    <form className="transferencia-form">
                        <div className="form-group">
                            <label>A quién (Nombre o Cuenta)</label>
                            <input type="text" placeholder="Ej. Juan Pérez o ES91..." className="form-input" />
                        </div>
                        
                        <div className="form-group">
                            <label>Importe (€)</label>
                            <input type="number" step="0.01" placeholder="0.00" className="form-input input-importe" />
                        </div>
                        
                        <div className="form-group">
                            <label>Categoría</label>
                            <select className="form-input">
                                <option value="">Selecciona una categoría</option>
                                <option value="Alimentación">Alimentación</option>
                                <option value="Ocio">Ocio</option>
                                <option value="Transporte">Transporte</option>
                                <option value="Vivienda">Vivienda</option>
                                <option value="Suscripciones">Suscripciones</option>
                                <option value="Otros gastos">Otros gastos</option>
                            </select>
                        </div>
                        
                        <button type="button" className="btn-enviar-transferencia">
                            Confirmar Envío
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default TransferenciaModal;
