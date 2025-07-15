import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

const signToken = (id: number, jid?: string) => {
  if (!jid) {
    jid = uuidv4();
  }
  return jwt.sign({ id, jid }, process.env.JWT_SECRET || "", {
    expiresIn: process.env.JWT_EXPIRES_IN as any,
  });
};

export { signToken };
