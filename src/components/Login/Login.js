import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../index';

const Login = ({ setIsAuthenticated }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_URL}/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json(); // Supongamos que el token viene en la respuesta
                localStorage.setItem('authToken', data.token); // Guarda el token en localStorage
                setIsAuthenticated(true); // Actualiza el estado de autenticación
                alert('Inicio de sesión exitoso');
                navigate('/home'); // Redirige a la página de inicio
            } else {
                setError('Email o contraseña incorrecta');
            }
        } catch (err) {
            setError('Error al iniciar sesión');
        }
    };

    const handleRegisterRedirect = () => {
        navigate('/register'); // Redirige a la página de registro
    };

    return (
        <div className="container mt-5" style={{ maxWidth: '400px' }}>
            <h2 className="text-center mb-4">Login</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleLogin}>
                <div className="form-group mb-3">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">Submit</button>
            </form>
            <p className="text-center mt-3">
                ¿No tienes una cuenta?{' '}
                <button className="btn btn-link p-0" onClick={handleRegisterRedirect}>
                    Regístrate aquí
                </button>
            </p>
        </div>
    );
};

export default Login;










