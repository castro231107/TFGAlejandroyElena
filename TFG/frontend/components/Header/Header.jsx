import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
    return (
        <header className="cabecera-app">
            <div className="logo-cabecera">
                <Link to="/micuenta">SafePocket</Link>
            </div>
            <nav className="navegacion-cabecera">
                <Link to="/micuenta">Mi Cuenta</Link>
                <Link to="/tarjeta">Tarjeta</Link>
                <Link to="/noticias">Noticias</Link>
                <Link to="/miperfil">Mi Perfil</Link>
            </nav>
        </header>
    );
}

export default Header;
