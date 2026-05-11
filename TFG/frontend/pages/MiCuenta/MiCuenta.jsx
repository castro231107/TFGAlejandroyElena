import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './MiCuenta.css';
import HistorialModal from '../../components/HistorialModal/HistorialModal';
import TransferenciaModal from '../../components/TransferenciaModal/TransferenciaModal';
import CategoriasModal from '../../components/CategoriasModal/CategoriasModal';
import TarjetaModal from '../../components/TarjetaModal/TarjetaModal';

function MiCuenta() {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [isHistorialOpen, setIsHistorialOpen] = useState(false);
    const [isTransferenciaOpen, setIsTransferenciaOpen] = useState(false);
    const [isCategoriasOpen, setIsCategoriasOpen] = useState(false);
    const [isTarjetaOpen, setIsTarjetaOpen] = useState(false);
    const [tarjeta, setTarjeta] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3000/api/usuarios/${id}`)
            .then(res => res.json())
            .then(data => setUser(data))
            .catch(err => console.error("Error al cargar usuario:", err));
    }, [id]);
    //[id] significa que se ejecutara cada vez que el id cambie

    useEffect(() => {
        fetch(`http://localhost:3000/api/tarjetas/${id}`)
            .then(res => res.json())
            .then(data => setTarjeta(data))
            .catch(err => console.error("Error al cargar tarjeta:", err));
    }, [id]);

    // Cargar movimientos
    useEffect(() => {
        fetch(`http://localhost:3000/api/movimientos/${id}`)
            .then(res => res.json())
            .then(data => setMovimientos(data))
            .catch(err => console.error("Error al cargar movimientos:", err));
    }, [id]);


    return (
        <div className="mi-cuenta-container">
            <div className="saldo-card">
                <h2>Dinero Total</h2>
                <h1 className="saldo-cantidad">
                    {user ? `${user.dinero.toLocaleString('es-ES', { minimumFractionDigits: 2 })} €` : "Cargando..."}
                </h1>
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
                <button className="accion-btn" onClick={() => setIsTarjetaOpen(true)}>
                    Tarjeta
                </button>
            </div>
            {/*isOpen verifica si está abierto y onClose es una función flecha que le dice al componente que debe estar cerrado*/}
            <HistorialModal isOpen={isHistorialOpen} onClose={() => setIsHistorialOpen(false)} />
            <TransferenciaModal isOpen={isTransferenciaOpen} onClose={() => setIsTransferenciaOpen(false)} />
            <CategoriasModal isOpen={isCategoriasOpen} onClose={() => setIsCategoriasOpen(false)} />
            <TarjetaModal
                isOpen={isTarjetaOpen}
                onClose={() => setIsTarjetaOpen(false)}
                tarjeta={tarjeta}
            />
        </div>
    );
}

export default MiCuenta;