import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../index';
import './Contact.css'; // Importa el archivo CSS

const Contact = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API_URL}/contact/add`, { name, phone });
            setMessage('Contacto registrado con éxito.');
            setName('');
            setPhone('');
        } catch (error) {
            setMessage('Error al registrar el contacto.');
        }
    };

    return (
        <div className="auth-container">
            <form className="form" onSubmit={handleSubmit}>
                <h2>Formulario de Contacto</h2>
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
                    <label>Teléfono</label>
                    <input
                        type="tel"
                        className="inputForm"
                        placeholder="Ingresa tu teléfono"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn">Enviar</button>
            </form>
        </div>
    );
};

export default Contact;



