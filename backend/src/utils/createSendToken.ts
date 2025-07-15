import { v4 as uuidv4 } from "uuid";
import redis from "../configs/redis";
import { signToken } from "../utils/signToken";

const createSendToken = (user: any, statusCode: number, res: any) => {
  const jid = uuidv4();
  const token = signToken(user.id, jid);

  const cookieOptions = {
    expires: new Date(
      Date.now() +
        Number(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: false,
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

  redis.set(`user_jid:${user.id}`, `${jid}`);

  res.status(statusCode).json({
    code: 0,
    data: {
      access_token: token,
    },
  });
};

export { createSendToken };
