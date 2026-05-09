import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
    const usuarioString = localStorage.getItem("usuario");
    const usuario = usuarioString ? JSON.parse(usuarioString) : null;
    const userId = usuario ? usuario._id : "";

    return (
        <header className="cabecera-app">
            <div className="logo-cabecera">
                <Link to={userId ? `/micuenta/${userId}` : "/micuenta"}>SafePocket</Link>
            </div>
            <nav className="navegacion-cabecera">
                <Link to={userId ? `/micuenta/${userId}` : "/micuenta"}>Mi Cuenta</Link>
                <Link to={userId ? `/tarjeta/${userId}` : "/tarjeta"}>Tarjeta</Link>
                <Link to={userId ? `/noticias/${userId}` : "/noticias"}>Noticias</Link>
                <Link to={userId ? `/miperfil/${userId}` : "/miperfil"}>Mi Perfil</Link>
            </nav>
        </header>
    );
}

export default Header;
