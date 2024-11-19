import { React, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:8000/users/login`, {
                email,
                password
            });
            // Suponiendo que la respuesta contiene un token
            localStorage.setItem('token', response.data.token);
            navigate('/home'); // Redirige después de login exitoso
        } catch (err) {
            setError('Email o contraseña incorrecta');
        }
    };

    // Función para redirigir al formulario de registro si el usuario no está registrado
    const handleRegisterRedirect = () => {
        navigate('/register'); // Redirige a la página de registro
    };

    return (
        <div className="container mt-5" style={{ maxWidth: '400px' }}>
            <h2 className="text-center mb-4">Login</h2>
            {error && <p style={{color: 'red'}}>{error}</p>}
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
                ¿No tienes una cuenta? <button className="btn btn-link p-0" onClick={handleRegisterRedirect}>Regístrate aquí</button>
            </p>
        </div>
    );
};

export default Login;






