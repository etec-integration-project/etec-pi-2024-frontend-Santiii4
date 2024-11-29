import axios from 'axios';
import React, { useEffect } from 'react';
import './home.css';
import logo from '../../assets/Logo.png'; // Nueva ruta al logo

const Home = () => {
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
        <div className="home">
            <main className="main-content">
                <div className="column">
                    <img src={logo} alt="RIGA Transporte Internacional" className="logo" />
                </div>
            </main>
        </div>
    );
};

export default Home;













