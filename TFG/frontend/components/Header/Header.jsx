import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
    return (
        <header className="app-header">
            <div className="header-logo">
                <Link to="/micuenta">SafePocket</Link>
            </div>
            <nav className="header-nav">
                <Link to="/micuenta">Mi Cuenta</Link>
                <Link to="/tarjeta">Tarjeta</Link>
                <Link to="/noticias">Noticias</Link>
                <Link to="/miperfil">Mi Perfil</Link>
            </nav>
        </header>
    );
}

export default Header;
