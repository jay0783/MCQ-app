import paths from "./path.js";
import definitions from "./definitions.js";
import parameters from "./parameters.js";
import config from "../../config/config.js";

export default {
  openapi: "3.0.0",
  info: {
    title: "SPACE-O MCQ API",
    version: "1.0.0",
    description: "SPACE-O-MCQ PROJECT",
  },
  servers: [
    {
      url: `${config.APP_URL}/api/v1/`,
      description: "SWAGGER_BASE_URL",
    },
  ],
  components: {
    securitySchemes: {
      apiAuth: {
        type: "apiKey",
        in: "header",
        name: "Authorization",
      },
    },
    schemas: definitions,
    parameters: parameters,
  },
  paths: paths,
};
