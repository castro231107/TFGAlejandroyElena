import React from 'react';
import './Footer.css';

function Footer() {
    return (
        <footer className="app-footer">
            <p>&copy; Copyright SafePocket {new Date().getFullYear()} | Todos los derechos reservados.</p>
        </footer>
    );
}

export default Footer;
