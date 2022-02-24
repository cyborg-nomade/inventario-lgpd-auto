/**
 * Required External Modules
 */
import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose";
import { casesRouter } from "./routes/cases.routes";
import { usersRouter } from "./routes/user.routes";
import { errorHandler } from "./middleware/error.middleware";
import { notFoundHandler } from "./middleware/not-found.middleware";

dotenv.config();

/**
 * App Variables
 */
if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

/**
 *  App Configuration
 */
app.use(helmet());
app.use(
  cors({
    allowedHeaders: "Origin,X-Requested-With,Content-Type,Accept,Authorization",
  })
);
app.use(express.json());
app.use("/api/cases", casesRouter);
app.use("/api/users", usersRouter);

app.use(errorHandler);
app.use(notFoundHandler);

/**
 * Server Activation
 */
mongoose
  .connect("mongodb://localhost:27017/lgpd")
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  })
  .catch((error) => console.log(error));
