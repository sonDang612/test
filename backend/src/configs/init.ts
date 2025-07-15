import { connectDB } from "./mssql";
import { Redis } from "./redis";

export const init = async () => {
  await connectDB();
  //await Redis.initialize();
};
