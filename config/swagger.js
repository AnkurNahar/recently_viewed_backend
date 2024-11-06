const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'Recently Viewed Products API',
        version: '1.0.0',
        description: 'API documentation for the Recently Viewed Products project',
      },
      servers: [
        {
          url: 'http://localhost:3000',
        },
      ],
      components: {
        securitySchemes: {
          BearerAuth: {
            type: 'http',
            scheme: 'bearer',
          },
        },
      },
      security: [
        {
          BearerAuth: [], // Apply BearerAuth to all endpoints
        },
      ],
    },
    apis: ['./routes/*.js'],
  };

  module.exports = swaggerOptions;