import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Simple Library API",
      version: "1.0.0",
      description: "API documentation for Simple Library",
    },
  },
  apis: ["./src/routes/*.ts"], // Sesuaikan dengan lokasi route API kamu
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export const setupSwagger = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  console.log("Swagger API documentation available at /api-docs");
};
