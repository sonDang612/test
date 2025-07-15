import dotenv from "dotenv";
dotenv.config({ path: ".env" });

import app from "./app";
import { init } from "./src/configs/init";

process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION!", err.name, err.message);
  process.exit(1);
});

const PORT = process.env.PORT || 3000;

let server: any;

init();

server = app.listen(PORT, () => {
  console.log(`App running on port ${PORT}...`);
});

process.on("unhandledRejection", (err: any) => {
  console.error("UNHANDLED REJECTION!", err.name, err.message);
  server?.close(() => {
    process.exit(1);
  });
});
