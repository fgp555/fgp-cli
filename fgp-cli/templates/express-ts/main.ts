// src/main.ts

import express, { Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import userRoutes from "./user/user.routes";

const app = express();

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from Express 5 + TypeScript!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
