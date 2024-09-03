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
            </form>
        </div>
    );
};

export default Login;


