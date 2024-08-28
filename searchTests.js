const axios = require('axios');

const baseURL = 'http://localhost:3000';

async function runTests() {
  try {

    // Búsqueda exacta
    const exactSearch = await axios.get(`${baseURL}/users/searchExact?name=Alice Johnson`);
    console.log('Resultados de búsqueda exacta:', exactSearch.data);

    // Búsqueda difusa
    const fuzzySearch = await axios.get(`${baseURL}/users/searchFuzzy?name=Alce`);
    console.log('Resultados de búsqueda difusa:', fuzzySearch.data);

    // Obtener todos los usuarios
    const allUsers = await axios.get(`${baseURL}/users`);
    console.log('Todos los usuarios:', allUsers.data);

  } catch (error) {
    console.error('Error durante las pruebas:', error.response ? error.response.data : error.message);
  }
}

runTests();