import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './index.css';  // Asegúrate de que este archivo esté en la carpeta public
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

export const API_URL = process.env.REACT_APP_API_URL;

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Routes>
                <Route path="/*" element={<App />} />
                <Route path="/" element={<Navigate to="/home" />} />
            </Routes>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);






