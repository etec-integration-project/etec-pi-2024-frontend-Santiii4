import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Header from './components/HyF/Header/Header';
import Footer from './components/HyF/Footer/Footer';
import Products from './components/Products/Products';
import Login from './components/Login/Login';
import Register from './components/Register/Register';

const App = () => {
    return (
        <div>
            <Header />
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                {/* Puedes agregar más rutas aquí */}
            </Routes>
            <Footer />
        </div>
    );
};

export default App;


