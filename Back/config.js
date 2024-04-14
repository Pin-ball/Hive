const itemPerPage = 15

const swagger = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Hive - Express API with Swagger",
      version: "0.1.0",
      description:
        "This is a CRUD API application made with Express and documented with Swagger",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./swagger/*.js"],
};

module.exports = {
  itemPerPage,
  swagger
};