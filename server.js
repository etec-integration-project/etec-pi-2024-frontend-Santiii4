const express = require('express');
const path = require('path');
const app = express();

// Servir archivos estáticos de la carpeta 'build'
app.use(express.static(path.join(__dirname, 'build')));

// Manejar todas las rutas redirigiendo a 'index.html'
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Cambia el puerto a 3000
const port = process.env.PORT || 3000;  // Cambié el puerto aquí
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

