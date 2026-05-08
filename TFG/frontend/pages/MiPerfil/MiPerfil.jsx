import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './MiPerfil.css';
import NotificacionesModal from '../../components/NotificacionesModal/NotificacionesModal';
// Importamos los componentes necesarios de la librería Recharts para la gráfica
import {
    Tooltip,
    Legend,
    ResponsiveContainer,
    Cell,
    PieChart,
    Pie
} from 'recharts';

function MiPerfil() {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    // Estado para controlar si el modal de notificaciones está abierto o cerrado
    const [isNotificacionesOpen, setIsNotificacionesOpen] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:3000/api/usuarios/${id}`)
            .then(res => res.json())
            .then(data => setUser(data))
            .catch(err => console.error("Error al cargar usuario:", err));
    }, [id]);

    // Datos simulados del usuario (nombre, apellido, contacto)
    const userData = user ? {
        nombre: user.nombre,
        apellido: user.apellidos,
        telefono: user.telefono,
        email: user.correo
    } : null;

    // Datos para la gráfica circular: cada objeto es una porción del gráfico
    const gastosData = [
        { name: 'Alimentación', value: 350, color: '#FF8042' },
        { name: 'Ocio', value: 150, color: '#0088FE' },
        { name: 'Transporte', value: 120, color: '#00C49F' },
        { name: 'Vivienda', value: 800, color: '#8884d8' },
        { name: 'Suscripciones', value: 45, color: '#FFBB28' },
        { name: 'Otros gastos', value: 60, color: '#A2A2A2' },
    ];

    // Función para simular la eliminación de la cuenta con una confirmación nativa del navegador
    const handleDeleteAccount = () => {
        if (window.confirm('¿Estás seguro de que deseas eliminar tu cuenta? Esta acción es irreversible.')) {
            alert('Cuenta eliminada (simulación)');
        }
    };

    if (!userData) {
        return <div className="perfil-container">Cargando datos del perfil...</div>;
    }

    return (
        <div className="perfil-container">
            {/* --- SECCIÓN 1: TARJETA DE PERFIL --- */}
            <div className="perfil-card">
                <div className="perfil-header">
                    {/* Avatar generado con las iniciales del usuario */}
                    <div className="avatar-placeholder">
                        {userData.nombre[0]}{userData.apellido[0]}
                    </div>
                    <h2>{userData.nombre} {userData.apellido}</h2>
                </div>

                <div className="perfil-info">
                    <div className="info-item">
                        <span className="info-label">Teléfono:</span>
                        <span className="info-value">{userData.telefono}</span>
                    </div>
                    <div className="info-item">
                        <span className="info-label">Email:</span>
                        <span className="info-value">{userData.email}</span>
                    </div>
                </div>

                <div className="perfil-acciones">
                    {/* Al pulsar, cambiamos el estado a 'true' para mostrar el modal */}
                    <button
                        className="perfil-btn btn-notificaciones"
                        onClick={() => setIsNotificacionesOpen(true)}
                    >
                        Notificaciones
                    </button>
                    <button
                        className="perfil-btn btn-eliminar"
                        onClick={handleDeleteAccount}
                    >
                        Eliminar Cuenta
                    </button>
                </div>
            </div>

            {/* --- SECCIÓN 2: GRÁFICA DE GASTOS --- */}
            <div className="grafica-seccion">
                <h3>Gastos Mensuales por Categoría</h3>
                <div className="chart-wrapper">
                    {/* ResponsiveContainer hace que la gráfica se adapte al ancho de su padre */}
                    <ResponsiveContainer width="100%" height={400}>
                        <PieChart>
                            <Pie
                                data={gastosData}
                                cx="50%" // Centro X al 50%
                                cy="50%" // Centro Y al 50%
                                labelLine={true} // Línea que une el quesito con el texto
                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                outerRadius={120} // Tamaño del círculo
                                fill="#8884d8"
                                dataKey="value" // indica qué propiedad del objeto se usará para calcular el tamaño de cada porción
                            >
                                {/* Mapeamos los datos para asignar a cada celda el color definido en 'gastosData' */}
                                {gastosData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip /> {/* Cuadro de información que sale al pasar el ratón */}
                            <Legend />  {/* Leyenda con los nombres de las categorías en la parte inferior */}
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Componente del Modal: se muestra solo si 'isOpen' es true */}
            <NotificacionesModal
                isOpen={isNotificacionesOpen}
                onClose={() => setIsNotificacionesOpen(false)}
            />
        </div>
    );
}

export default MiPerfil;
