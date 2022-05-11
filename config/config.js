// import dotenv from "dotenv/config";
// /**
//  * @description configuration of database : MySql
//  */

// const config = {
//   HOST: process.env.DB_HOST,
//   USER: process.env.DB_USERNAME,
//   PASSWORD: process.env.DB_PASSWORD,
//   DB: process.env.DB_NAME,
//   port: process.env.DB_PORT,
//   dialect: process.env.DB_DIALECT,
//   logging: true,
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000,
//   },
// };
// export default config;

// config.js

import dotenv from "dotenv/config";
/**
 * @description configuration of database : MySql
 */

const config = {
  // SERVER_PORT: process.env.SERVER_PORT,
  APP_URL: process.env.APP_URL,

  sequelizeDb: {
    HOST: process.env.DB_HOST,
    USER: process.env.DB_USERNAME,
    PASSWORD: process.env.DB_PASSWORD,
    DB: process.env.DB_NAME,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    logging: true,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
};
export default config;
