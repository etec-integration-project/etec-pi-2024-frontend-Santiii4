import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="contact-info">
                    <p>Gmail de contacto: <a href="https://mail.google.com/mail/?view=cm&fs=1&to=claudio.sanchez@riga.com.ar" target="_blank" rel="noopener noreferrer">claudio.sanchez@riga.com.ar</a></p>
                    <p>Número de teléfono: <a href="tel:+5492615980973">+54 9 2615980973</a></p>
                </div>
                <div className="copyright">
                    <p>Derechos de autor &copy; 2024 RIGA Transporte Internacional</p>
                </div>
                <div className="affiliates">
                    <p>Socios y Afiliados:</p>
                    <ul>
                        <li>Transweide</li>
                        <li>Borg</li>
                        <li>Cotracaaro</li>
                        <li>Remmos</li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;





