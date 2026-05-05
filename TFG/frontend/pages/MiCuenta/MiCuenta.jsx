import React, { useState } from 'react';
import './MiCuenta.css';
import HistorialModal from '../../components/HistorialModal/HistorialModal';
import TransferenciaModal from '../../components/TransferenciaModal/TransferenciaModal';
import CategoriasModal from '../../components/CategoriasModal/CategoriasModal';

function MiCuenta() {
    const [isHistorialOpen, setIsHistorialOpen] = useState(false);
    const [isTransferenciaOpen, setIsTransferenciaOpen] = useState(false);
    const [isCategoriasOpen, setIsCategoriasOpen] = useState(false);

    return (
        <div className="mi-cuenta-container">
            <div className="saldo-card">
                <h2>Dinero Total</h2>
                <h1 className="saldo-cantidad">745,00 €</h1>
            </div>

            <div className="botones-container">
                <button className="accion-btn" onClick={() => setIsHistorialOpen(true)}>
                    Historial
                </button>
                <button className="accion-btn btn-primario" onClick={() => setIsTransferenciaOpen(true)}>
                    Transferencia
                </button>
                <button className="accion-btn" onClick={() => setIsCategoriasOpen(true)}>
                    Categorías
                </button>
            </div>
            {/*isOpen verifica si está abierto y onClose es una función que cierra el modal*/}
            <HistorialModal isOpen={isHistorialOpen} onClose={() => setIsHistorialOpen(false)} />
            <TransferenciaModal isOpen={isTransferenciaOpen} onClose={() => setIsTransferenciaOpen(false)} />
            <CategoriasModal isOpen={isCategoriasOpen} onClose={() => setIsCategoriasOpen(false)} />
        </div>
    );
}

export default MiCuenta;