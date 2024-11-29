import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Header from './components/HyF/Header/Header';
import Footer from './components/HyF/Footer/Footer';
import Products from './components/Products/Products';
import Contact from './components/Contact/Contact';
import Cart from './components/Cart/Cart';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Opinion from './components/Opinion/Opinion';
import { API_URL } from './index';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Verificar autenticación
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch(`${API_URL}/users/protected-route`, { credentials: 'include' });
                if (response.ok) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            } catch {
                setIsAuthenticated(false);
            }
        };

        checkAuth();
    }, []);

    // Manejar cierre de sesión
    const handleLogout = async () => {
        try {
            const response = await fetch(`${API_URL}/users/logout`, {
                method: 'POST',
                credentials: 'include',
            });
            if (response.ok) {
                setIsAuthenticated(false);
            }
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    return (
        <div>
            <Header isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
                <Route path="/register" element={<Register />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/opinion" element={<Opinion />} />
            </Routes>
            <Footer />
        </div>
    );
};

export default App;












