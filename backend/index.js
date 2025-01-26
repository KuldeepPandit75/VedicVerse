import express from "express";
const app = express();
import cors from "cors";
import Connection from "./database/db.js";
// import quizRoutes from "./routes/quizRoutes.js";
import router from "./routes/route.js";
import "dotenv/config";
// import {fileURLToPath} from "url";
// import path from "path";

const port = process.env.PORT || 3030;

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(
  cors({
    origin: ["https://mercat-ten.vercel.app", "http://localhost:5173", "https://vedic-verse.vercel.app"], // Add both production and development origins
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed methods
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", router);
app.listen(port, () => {
  console.log(`listening on port http://localhost:${port}`);
});

Connection();
