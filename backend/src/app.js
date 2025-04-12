import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173","https://vedic-verse.vercel.app"],
    credentials: true,
  })
);
// app.use(express.json({ limit: "20kb" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "20kb" }));
app.use(express.static("public"));
app.use(cookieParser());

import userRouter from "./routes/user.route.js";

app.use("/api/v1/users", userRouter);

export { app };
