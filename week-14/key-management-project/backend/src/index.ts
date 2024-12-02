import dotenv from "dotenv";
dotenv.config();
import "express-async-errors";
import express, { Request, Response } from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import rateLimiter from "express-rate-limit";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

// Routers

import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import txnRouter from "./routes/txn.routes.js";

// Middleware
import notFoundMiddleware from "./middlewares/not-found.js";
import errorHandlerMiddleware from "./middlewares/error-handler.js";

export const prismaClient = new PrismaClient();

// Initialize Express app
const app = express();

// Middleware setup
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cookieParser(process.env.COOKIE_SECRET));

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static(resolve(__dirname, "../../frontend/dist"))); // Uncomment if you have a frontend
// Security
app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
  })
);
app.use(
  helmet({
    contentSecurityPolicy: false, // Disables CSP entirely
  })
);
app.use(
  cors({
    origin: "*",
  })
);

// Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/txn", txnRouter);

// Serve static files in production
// Uncomment the below line if you have a frontend to serve in production
app.get("*", (req: Request, res: Response) => {
  res.sendFile(resolve(__dirname, "../../frontend/dist", "index.html"));
});

// Error handling
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// Port
const port = process.env.PORT || 3000;

// Start the server
const startServer = async () => {
  try {
    await prismaClient.$connect();
    console.log("Connected to the database successfully.");
    app.listen(port, () => {
      console.log(`Server is listening on http://localhost:${port}/...`);
    });
  } catch (error) {
    console.error(error);
  }
};

startServer();
