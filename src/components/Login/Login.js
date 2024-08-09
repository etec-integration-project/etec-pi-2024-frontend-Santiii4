import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; 

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            if (response.ok) {
                const data = await response.json();
                navigate('/home');
            } else {
                alert('Login failed');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error logging in');
        }
    };

    const handleGoogleLogin = () => {
        window.location.href = 'http://localhost:5000/auth/google'; // Redirige a la ruta de Google
    };

    const handleAppleLogin = () => {
        window.location.href = 'http://localhost:5000/auth/apple'; // Redirige a la ruta de Apple
    };

    return (
        <div className="auth-container">
            <form className="form" onSubmit={handleLogin}>
                <div className="flex-column">
                    <label>Email</label>
                </div>
                <div className="inputForm">
                    <input
                        type="text"
                        className="input"
                        placeholder="Enter your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="flex-column">
                    <label>Password</label>
                </div>
                <div className="inputForm">
                    <input
                        type="password"
                        className="input"
                        placeholder="Enter your Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className="flex-row">
                    <div>
                        <input type="checkbox" />
                        <label>Remember me</label>
                    </div>
                    <span className="span">Forgot password?</span>
                </div>
                <button className="button-submit">Sign In</button>
                <p className="p">
                    Don't have an account? <span className="span" onClick={() => navigate('/register')}>Sign Up</span>
                </p>
                <p className="p line">Or With</p>

                <div className="flex-row">
                    <button className="btn google" onClick={handleGoogleLogin}>
                        <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                            <path fill="#4285F4" d="M24 9.5c2.2 0 4.2.8 5.7 2.3l4.2-4.2C31.5 5.4 27.9 4 24 4 15.9 4 9.2 9.6 7.3 17h5.4c1.3-4.5 5.4-7.5 10.3-7.5z"/>
                            <path fill="#34A853" d="M24 44c5.1 0 9.3-1.7 12.4-4.5l-5.7-4.7C28.9 36.4 26.5 37.5 24 37.5c-4.5 0-8.3-3-9.7-7H7.9v4.5C10.8 40.4 17 44 24 44z"/>
                            <path fill="#FBBC05" d="M43.6 20H42V20H24v8.5h11.3c-1.5 4-5.3 7-9.7 7-2.7 0-5.1-.9-7-2.5l-5.7 4.7C17.7 42.3 20.9 44 24 44c6.5 0 12-4.3 13.9-10.5H43.5V20z"/>
                            <path fill="#EA4335" d="M24 37.5c-4.5 0-8.3-3-9.7-7H7.9v4.5C10.8 40.4 17 44 24 44c5.1 0 9.3-1.7 12.4-4.5l-5.7-4.7C28.9 36.4 26.5 37.5 24 37.5z"/>
                            <path fill="none" d="M0 0h48v48H0z"/>
                        </svg>
                        Google
                    </button>
                    <button className="btn apple" onClick={handleAppleLogin}>
                        <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                            <path fill="black" d="M318.7 268.6c-.3-37.1 16.3-64.7 50.5-86.1-19.4-28.3-48.5-44.1-84.5-44.1-35.4 0-65.7 20.4-81.6 20.4-16.9 0-46.6-19.8-76.6-19.4-39.5.3-79.8 24.3-101.3 61.9-43.7 76.1-11.3 188.4 31.2 249.9 20.7 29.6 45.2 62.9 77.5 61.7 30.6-1.2 42.4-19.8 79-19.8 36.3 0 47.1 19.8 79.1 19.2 32.9-.6 54.1-29.7 74.7-59.6 13.8-20.3 19.1-30.4 29.8-53.1-77.9-29.6-91.7-137-13.8-173.5zM243.5 119c28.4-34.2 23.8-64.9 23.1-69.1-22.3 1.3-48.5 15.4-63.8 35.5-13.8 18-25.9 47.2-22.6 75.4 24.1 1.9 49.5-11.9 63.3-41.8z"/>
                        </svg>
                        Apple
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Login;


