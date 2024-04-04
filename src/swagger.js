const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Your API Documentation',
            version: '1.0.0',
            description: 'Documentation for your API',
        },
    },
    apis: ['./routes/comment.js'],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
