import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../index';
import './Opinion.css'; // Importa el archivo CSS

const Opinion = () => {
    const [name, setName] = useState('');
    const [opinion, setOpinion] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API_URL}/opinion/add`, { name, opinion });
            setMessage('Opinión registrada con éxito.');
            setName('');
            setOpinion('');
        } catch (error) {
            setMessage('Error al registrar la opinión.');
        }
    };

    return (
        <div className="auth-container">
            <form className="form" onSubmit={handleSubmit}>
                <h2>Formulario de Opiniones</h2>
                {message && <p style={{ color: message.includes('éxito') ? 'green' : 'red' }}>{message}</p>}
                <div className="form-group">
                    <label>Nombre</label>
                    <input
                        type="text"
                        className="inputForm"
                        placeholder="Ingresa tu nombre"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Opinión</label>
                    <textarea
                        className="inputForm"
                        placeholder="Escribe tu opinión"
                        value={opinion}
                        onChange={(e) => setOpinion(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn">Enviar</button>
            </form>
        </div>
    );
};

export default Opinion;



