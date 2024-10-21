import dotenv, { config } from "dotenv";
import express, { json } from "express";
import logger from "./logger";
import morgan from "morgan";
import prisma from "./prisma/migrations/connect";
import bodyParser from "body-parser";
import { ErrorHandler } from "./src/utils/ErrorHandler";
import cookieParser from "cookie-parser";
dotenv.config();

// routes
import loginRoute from "./src/routes/login.routes.";
import taskRoutes from "./src/routes/task.route";

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

// morgan
const morganFormat = ":method :url :status :response-time ms";
app.use(
  morgan(morganFormat, {
    stream: {
      write: (message: any) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);

// routes
app.use("/", loginRoute);
app.use("/", taskRoutes);

// global error handler
app.use(ErrorHandler);

// server
const StartServer = async () => {
  try {
    await prisma.$connect();
    console.log("database is connected 💎");

    app.listen(process.env.PORT || 3000, () => {
      console.log("server is online 🚀");
    });
  } catch (error) {
    console.error(error);
  }
};
StartServer();

// to disconnect db on exit
process.on("SIGINT", async () => {
  await prisma.$disconnect();
  console.log("database is disconnected 🚩");
  process.exit(0);
});
