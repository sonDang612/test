import cors from "cors";
import express, { Request } from "express";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import requestIp from "request-ip";
import swaggerUI from "swagger-ui-express";
import appRouter from "./src/routes/";
import { AppError } from "./src/utils/appError";
import globalErrorHandler from "./src/utils/globalError";
import { swaggerSpec } from "./src/utils/swagger";
import { protectIP } from "./src/utils/protectIP";

const app = express();

app.set("trust proxy", true);

// set security http headers
app.use(helmet());

app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
}

app.use(requestIp.mw());

app.use(protectIP);

// limit request api
// 1000 request for the same ip each 1 hours
// const limiter = rateLimit({
//   max: 1000,
//   windowMs: 60 * 60 * 1000,
//   message: "Too many requests from this IP, please try again in an hour",
// });
// app.use("/api", limiter);

// body parser, reading data from body into req.body
app.use(express.json({ limit: "10kb" }));

app.use("/static", express.static(path.join(process.cwd(), "static")));

app.use((req: Request, _, next) => {
  req.requestTime = new Date().toISOString();
  //console.log(req.headers);
  next();
});
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// Routes
app.use("/api/v1", appRouter);

app.all(/(.*)/, (req, _, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 200));
});

app.use(globalErrorHandler);

export default app;
