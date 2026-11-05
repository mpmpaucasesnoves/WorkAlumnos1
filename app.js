const express = require('express');
const app = express();

const alumnoRoutes = require('./routes/alumnoRoutes');

// Permite que Express entienda JSON en el cuerpo de las peticiones
app.use(express.json());

// Engancha las rutas
app.use('/api/alumnos', alumnoRoutes);

const PUERTO = 3000;
// Afegim '0.0.0.0' per indicar a Express que escolti en TOTES les interfícies de xarxa
app.listen(PUERTO, '0.0.0.0', () => {
  console.log(`Servidor de la API corriendo en http://localhost:${PUERTO}`);
});