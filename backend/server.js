import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js"
import voteRoutes from "./routes/voteRoutes.js"
import path from "path"
import { fileURLToPath } from "url";

dotenv.config()

const app = express();
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(
    cors({
        origin: process.env.CLIENT_URL || "*",
        methods: ["GET", "POST", "DELETE", "PUT"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
)

app.use(express.json());
connectDB()

app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/vote", voteRoutes)

app.use("/uploads", express.static(path.join(__dirname, "uploads")))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));