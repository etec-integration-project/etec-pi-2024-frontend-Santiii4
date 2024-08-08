import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Header from './components/HyF/Header/Header';
import Footer from './components/HyF/Footer/Footer';
import Products from './components/Products/Products';

const App = () => {
    return (
        <div>
            <Header />
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/products" element={<Products />} />
                {/* Puedes agregar más rutas aquí */}
            </Routes>
            <Footer />
        </div>
    );
};

export default App;


