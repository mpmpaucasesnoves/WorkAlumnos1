const fs = require('fs');
const path = require('path');

// Definimos la función que nos permitirá leer todos los alumnos
function obtenerAlumnos(req, res) {
  // Leemos el archivo JSON
  const rutaArchivo = path.join(__dirname, '../data/students.json');
  const datosTexto = fs.readFileSync(rutaArchivo, 'utf-8');
  
  // Convertimos el texto a una lista de objetos de JavaScript
  const listaAlumnos = JSON.parse(datosTexto);

  // Enviamos la lista como respuesta
  res.json(listaAlumnos);
}

// Función para buscar un alumno por su ID
function obtenerAlumnoPorId(req, res) {
  // Leemos el id de los parámetros de la URL (req.params)
  const idBusqueda = parseInt(req.params.idAlumno);

  // Leemos los datos del JSON
  const rutaArchivo = path.join(__dirname, '../data/students.json');
  const datosTexto = fs.readFileSync(rutaArchivo, 'utf-8');
  const listaAlumnos = JSON.parse(datosTexto);

  // Buscamos el alumno en la lista
  const alumno = listaAlumnos.find(a => a.id === idBusqueda);

  //Caso de que el alumno no se encuentre en la lista, devolvemo un mensaje con el código 404
  if (!alumno) {
    return res.status(404).json({error: 'Alumno no encontrado'})
  }

  // 4. Respondemos con el alumno encontrado
  res.json(alumno);
}

// Función para calcular la nota media de cada alumno
function calcularNotasMedias(req, res) {
  // Leemos los datos del JSON
  const rutaArchivo = path.join(__dirname, '../data/students.json');
  const datosTexto = fs.readFileSync(rutaArchivo, 'utf-8');
  const listaAlumnos = JSON.parse(datosTexto);

  // Creamos una lista vacía para guardar los resultados
  const resultados = [];

  // Recorremos alumno por alumno con un bucle FOR
  for (let i = 0; i < listaAlumnos.length; i++) {
    const alumno = listaAlumnos[i];

    // Sumamos las notas de este alumno
    let suma = 0;
    for (let j = 0; j < alumno.grades.length; j++) {
      suma = suma + alumno.grades[j];
    }

    // Calculamos la media
    const mediaExacta = suma / alumno.grades.length;
    const mediaConDecimales = parseFloat(mediaExacta.toFixed(2));

    // Guardamos el objeto simplificado en nuestro array de resultados
    resultados.push({
      nombreCompleto: alumno.surname + ", " + alumno.name,
      notaMedia: mediaConDecimales
    });
  }

  // Enviamos la respuesta
  res.json(resultados);
}

// Exportamos las funciones para que el Router pueda usarla
module.exports = {
  obtenerAlumnos,
  obtenerAlumnoPorId,
  calcularNotasMedias
};