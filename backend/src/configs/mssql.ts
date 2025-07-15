import { Sequelize } from "sequelize";
import { AppError } from "../utils/appError";
import { initQuery } from "../constants/query/initQuery";

const config = {
  DB_DATABASE: process.env.DB_DATABASE || "",
  DB_PORT: Number(process.env.DB_PORT || 1433),
  DB_USERNAME: process.env.DB_USERNAME || "",
  DB_PASSWORD: process.env.DB_PASSWORD || "",
  DB_HOST: process.env.DB_HOST || "127.0.0.1",
};

if (!config.DB_DATABASE || !config.DB_USERNAME || !config.DB_PASSWORD) {
  throw new AppError("Missing required DB environment variables", 500);
}

const sequelize = new Sequelize(
  config.DB_DATABASE,
  config.DB_USERNAME,
  config.DB_PASSWORD,
  {
    host: config.DB_HOST,
    port: config.DB_PORT,
    dialect: "mssql",
    dialectOptions: {
      options: {
        encrypt: true,
      },
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    logging: false,
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    //await sequelize.query(initQuery);
    console.log("Database connected.");
  } catch (err: any) {
    console.error("DB connection failed:", err.message);
    throw new AppError("Connect DB Error", 500);
  }
};

export { connectDB, sequelize };
