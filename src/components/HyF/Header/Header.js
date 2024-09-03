import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import logo from '../../../assets/Logo.png';

const Header = () => {
    return (
        <header className="header">
            <div className="header-content">
                <Link to="/home">
                    <img src={logo} alt="RIGA Transporte Internacional" className="logo" />
                </Link>
                <nav>
                    <ul>
                        <li><Link to="/login">Login/Register</Link></li>
                        <li><Link to="/products">Products</Link></li>
                        <li><Link to="/more-info">+ Info</Link></li>
                        <li><Link to="/cart">Carrito</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;








