import express from "express";
import apiV1 from "./api/v1/index.js";
const route = express.Router();

/**
 * Candidate Api routing
 */

route.use("/api/v1/", apiV1);
export default route;
