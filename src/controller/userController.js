const elasticsearchService = require('../services/elasticsearchService');
const { ValidationError } = require('../utils/customErrors');
const { DatabaseError } = require('../utils/customErrors');


exports.exactSearch = async (req, res, next) => {
    try {
        const { name, email, age, address } = req.query;
        const queryParams = {};

        if (name) queryParams.name = name;
        if (email) queryParams.email = email;
        if (age) queryParams.age = parseInt(age, 10);
        if (address) queryParams.address = address;

        if (Object.keys(queryParams).length === 0) {
            return res.status(400).json({ error: 'Se requiere al menos un parámetro de búsqueda' });
        }

        const result = await elasticsearchService.exactSearch(queryParams);
        res.json(result);
    } catch (error) {
        next(error);
    }
};




exports.fuzzySearch = async (req, res, next) => {
    try {
        const { name, email, age, address } = req.query;
        const queryParams = {};

        if (name) queryParams.name = name;
        if (email) queryParams.email = email;
        if (age) queryParams.age = age; 
        if (address) queryParams.address = address;

        if (Object.keys(queryParams).length === 0) {
            throw new ValidationError('Se requiere al menos un parámetro de búsqueda');
        }

        const result = await elasticsearchService.fuzzySearch(queryParams);
        res.json(result);
    } catch (error) {
        next(error);
    }
};
exports.getAllUsers = async (req, res, next) => {
    try {
        const result = await elasticsearchService.getAllUsers();
        res.json(result);
    } catch (error) {
        next(error);
    }
};