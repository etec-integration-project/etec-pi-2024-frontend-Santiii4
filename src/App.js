import axios from 'axios';
import { React, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Header from './components/HyF/Header/Header';
import Footer from './components/HyF/Footer/Footer';
import Products from './components/Products/Products';
import MoreInfo from './components/MoreInfo/MoreInfo';
import Cart from './components/Cart/Cart';
import Login from './components/Login/Login';
import Register from './components/Register/Register';

const App = () => {
    useEffect(() => {
        // Ejemplo de petición a la API al montar el componente
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/some-endpoint');
                console.log('Datos obtenidos:', response.data);
            } catch (error) {
                console.error('Error al obtener datos:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <Header />
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/more-info" element={<MoreInfo />} />
                {/* Puedes agregar más rutas aquí */}
            </Routes>
            <Footer />
        </div>
    );
};

export default App;


