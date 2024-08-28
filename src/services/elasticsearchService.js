const { Client } = require('@elastic/elasticsearch');
const config = require('../config/elasticsearchConfig');
const { userMapping, sampleUsers } = require('../config/userConfig');
const { DatabaseError, NotFoundError } = require('../utils/customErrors');

const client = new Client(config);


exports.indexUsers = async () => {
    try {
        // validaciones para evitar errores en la indexación
        const indexExists = await client.indices.exists({ index: 'users' });
        
        if (!indexExists) {
            console.log('Creando índice "users"...');
            await client.indices.create({
                index: 'users',
                body: {
                    mappings: userMapping
                }
            });
        } else {
            console.log('El índice "users" ya existe.');
        }

        console.log('Indexando usuarios...');
        const body = sampleUsers.flatMap(doc => [{ index: { _index: 'users' } }, doc]);
        const bulkResponse = await client.bulk({ refresh: true, body });

        console.log('Respuesta de bulk:', JSON.stringify(bulkResponse, null, 2));

        if (bulkResponse.errors) {
            const erroredDocuments = bulkResponse.items.filter(item => item.index && item.index.error);
            console.error('Errores en la indexación:', erroredDocuments);     ///erroes en consola de docker
            throw new DatabaseError('Errores durante la indexación');
        }

        return { message: `${sampleUsers.length} documentos indexados correctamente` };
    } catch (error) {
        console.error('Error al indexar documentos:', error);
        if (error instanceof DatabaseError) {
            throw error;
        }
        throw new DatabaseError('Error al indexar documentos', error);
    }
};



exports.exactSearch = async (queryParams) => {
    try {
        const mustClauses = Object.entries(queryParams).map(([field, value]) => {
            if (field === 'age') {
                return { term: { [field]: value } };
            } else if (field === 'name' || field === 'address') {
                return {
                    match: {
                        [field]: {
                            query: value,
                            operator: 'and'
                        }
                    }
                };
            } else {
                return { term: { [field]: value } };
            }
        });

        const response = await client.search({
            index: 'users',
            body: {
                query: {
                    bool: {
                        must: mustClauses
                    }
                }
            }
        });

        console.log('Respuesta de búsqueda exacta:', JSON.stringify(response, null, 2));

        const results = response.hits.hits.map(hit => ({
            id: hit._id,
            score: hit._score,
            ...hit._source
        }));

        return {
            message: results.length > 0 ? 'Resultados encontrados' : 'No se encontraron resultados',
            count: results.length,
            results: results
        };
    } catch (error) {
        console.error('Error en la búsqueda exacta:', error);
        throw new DatabaseError('Error al realizar la búsqueda exacta', error);
    }
};


exports.fuzzySearch = async (queryParams) => {
    try {
        const shouldClauses = Object.entries(queryParams).flatMap(([field, value]) => {
            if (field === 'age') {
                return [
                    { range: { [field]: { gte: parseInt(value) - 2, lte: parseInt(value) + 2 } } }
                ];
            } else if (field === 'name') {
                // Manejar nombres completos con 'match' y 'fuzziness'
                const terms = value.split(' ');
                return [
                    {
                        match: {
                            [field]: {
                                query: value,
                                operator: 'or', // para flexibilidad en coincidencias parciales
                                fuzziness: 'AUTO'
                            }
                        }
                    },
                    ...terms.map(term => ({
                        match: {
                            [field]: {
                                query: term,
                                fuzziness: 'AUTO'
                            }
                        }
                    }))
                ];
            } else {
                return [
                    { 
                        fuzzy: {
                            [field]: {
                                value: value,
                                fuzziness: 'AUTO',
                                max_expansions: 50 // Mejora de rendimiento
                            }
                        }
                    }
                ];
            }
        });

        const response = await client.search({
            index: 'users',
            body: {
                query: {
                    bool: {
                        should: shouldClauses, // Usar 'should' para mayor flexibilidad en la búsqueda
                        minimum_should_match: 1 // Requiere al menos una coincidencia 
                    }
                }
            }
        });

        console.log('Respuesta de búsqueda Fuzzy:', JSON.stringify(response, null, 2));

        const results = response.hits.hits.map(hit => ({
            id: hit._id,
            score: hit._score,
            ...hit._source
        }));

        return {
            message: results.length > 0 ? 'Resultados encontrados' : 'No se encontraron resultados',
            count: results.length,
            results: results
        };
    } catch (error) {
        console.error('Error en la búsqueda Fuzzy:', error);
        throw new DatabaseError('Error al realizar la búsqueda fuzzy', error);
    }
};


exports.getAllUsers = async () => {
    try {
        console.log('Iniciando búsqueda de todos los usuarios');
        const response = await client.search({
            index: 'users',
            body: {
                query: { match_all: {} }
            }
        });
        
        console.log('Respuesta completa:', JSON.stringify(response, null, 2));

        const hits = response.hits;

        if (!hits || !hits.hits) {
            throw new Error('La respuesta de Elasticsearch no contiene hits'); /// error en consola de docker(manejo de errores por parte del servicio)
        }

        if (hits.total.value === 0) {
            throw new NotFoundError('No hay usuarios en la base de datos');
        }

        return hits.hits.map(hit => ({
            id: hit._id,
            ...hit._source
        }));
    } catch (error) {
        console.error('Error detallado al obtener todos los usuarios:', error);
        if (error instanceof NotFoundError) {
            throw error;
        }
        throw new DatabaseError('Error al obtener todos los usuarios', error);
    }
};