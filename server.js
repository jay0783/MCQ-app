import express from "express";
import dotenv from "dotenv/config";
import swaggerUi from "swagger-ui-express";
import openApiDocumentation from "./utils/swagger/swagger.js";

// import config from "./config/config.js";
import router from "./routes/index.js";

const app = express();

/**
 * Swagger routing...
 */
// app.use('/swagger.json', express.static('./utils/swagger/swagger.json'));
var options = {
  explorer: true,
  swaggerOptions: {
    url: `${process.env.APP_URL}/swagger.json`,
    validatorUrl: null,
  },
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Header all controles Perimissions
 */
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "OPTIONS,GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(null, options));
app.get("/swagger.json", (req, res) => res.json(openApiDocumentation));
/**
 * Error handling middleware
 */
app.use(function (error, req, res, next) {
  if (error instanceof SyntaxError) {
    res.json({
      responseStatus: false,
      responseCode: 500,
      responseMessage: "Invalid Syntax",
    });
  } else {
    next();
  }
});

/**
 * API starting route
 */
app.use("/", router);

/**
 * Application listern PORT
 */
app.listen(process.env.SERVER_PORT, (error) => {
  if (error) {
    console.log(`Server is not listening on port ${process.env.SERVER_PORT}`);
  } else {
    console.log(`Server is listening on port ${process.env.SERVER_PORT}`);
  }
});
