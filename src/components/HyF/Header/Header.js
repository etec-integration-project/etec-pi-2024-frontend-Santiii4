import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import logo from '../../../assets/Logo.png';

const Header = ({ isAuthenticated, handleLogout }) => {
    return (
        <header className="header">
            <div className="header-content">
                <Link to="/home">
                    <img src={logo} alt="RIGA Transporte Internacional" className="logo" />
                </Link>
                <nav>
                    <ul>
                        {isAuthenticated ? (
                            <li>
                                <button
                                    onClick={handleLogout}
                                    style={{ background: 'none', border: 'none', color: '#FEFAE0', cursor: 'pointer' }}
                                >
                                    Logout
                                </button>
                            </li>
                        ) : (
                            <li><Link to="/login">Login/Register</Link></li>
                        )}
                        <li><Link to="/products">Products</Link></li>
                        <li><Link to="/cart">🛒</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                        <li><Link to="/opinion">Opinion</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;









