import React from 'react';
import './home.css';
import logo from '../../assets/Logo.png'; // Nueva ruta al logo

const Home = () => {
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












