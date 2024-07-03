import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './index.css';
import App from './App';

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Routes>
                <Route path="*" element={<Navigate to="/home" />} />
            </Routes>
            <App />
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);




