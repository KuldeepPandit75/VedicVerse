import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";
import { Server } from 'socket.io'
import handleSocketEvents from "./controllers/socketController.js";

dotenv.config({
  path: "./.env",
});

const server=app.listen(process.env.PORT || 8000, () =>
  console.log(`serve is listen on port ${process.env.PORT}`)
);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

handleSocketEvents(io);
connectDB();