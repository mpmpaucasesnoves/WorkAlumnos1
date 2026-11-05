const express = require('express');
const router = express.Router();
const alumnoController = require('../controllers/alumnoController');

// Define la ruta GET para obtener todos los alumnos
router.get('/todos', alumnoController.obtenerAlumnos);

// Define la ruta GET para obtener un alumno por su ID
router.get('/:idAlumno', alumnoController.obtenerAlumnoPorId);

// Define la ruta GET para calcular las medias de los alumnos
router.get('/notas/medias', alumnoController.calcularNotasMedias);

module.exports = router;