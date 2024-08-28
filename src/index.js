const express = require('express');
const userController = require('./controller/userController');
const errorHandler = require('./utils/errorHandler');
const elasticsearchService = require('./services/elasticsearchService');

const app = express();
app.use(express.json());

// Función para inicializar la indexación de datos en Elasticsearch
async function initializeDatabase() {
    try {
        const result = await elasticsearchService.indexUsers(); // Indexa los datos de prueba
        console.log(result.message);
    } catch (error) {
        console.error('Error al inicializar la base de datos:', error); 
        process.exit(1);
    }
}

// Rutas
app.get('/users/searchFuzzy', userController.fuzzySearch);
app.get('/users/searchExact', userController.exactSearch);
app.get('/users', userController.getAllUsers);

// Manejador de errores global
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

// Inicializar la base de datos y luego iniciar el servidor(usa los datos de prueba como base de datos)
initializeDatabase().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
});