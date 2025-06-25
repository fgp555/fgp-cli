import express from "express";
import morgan from "morgan";
import cors from "cors";
import userRoutes from "./user/user.routes";

export const createApp = () => {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(morgan("dev"));
  app.use(express.json());

  // Routes
  app.use("/api/user", userRoutes);

  // Health check
  app.get("/", (_, res) => {
    res.send("Hello from Express + TypeScript + GraphQL + Socket.IO!");
  });

  return app;
};
