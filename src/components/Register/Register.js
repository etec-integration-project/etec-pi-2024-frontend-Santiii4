import { React, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/users/register', {
                name,
                email,
                password
            });
            // Suponiendo que la respuesta contiene un token
            localStorage.setItem('token', response.data.token);
            navigate('/home'); // Redirige después del registro exitoso
        } catch (err) {
            setError('Registro fallido. Inténtalo de nuevo.');
        }
    };

    return (
        <div className="container mt-5" style={{ maxWidth: '400px' }}>
            <h2 className="text-center mb-4">Register</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleRegister}>
                <div className="form-group mb-3">
                    <label htmlFor="name">Nombre</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Enter name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="password">Contraseña</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">Register</button>
            </form>

            <p className="text-center mt-3">
                ¿Ya tienes una cuenta? <button className="btn btn-link p-0" onClick={() => navigate('/login')}>Inicia sesión aquí</button>
            </p>
        </div>
    );
};

export default Register;




