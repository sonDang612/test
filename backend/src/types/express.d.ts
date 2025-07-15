import { Request } from "express";

declare module "express-serve-static-core" {
  interface Request {
    requestTime?: string;
    user?: any;
    jid?: string;
  }
}
