import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import database from "./config/database.js";
import quizRoutes from "./routes/quizRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

// Connect to MongoDB
database.connect();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173", 
    credentials: true
}));

// Routes
app.use("/api/quiz", quizRoutes);
app.use("/api/auth", authRoutes);

// Default route
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Your server is up and running..."
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error("Error:", err.stack);
    res.status(500).json({ success: false, message: "Server Error" });
});

// Start server
app.listen(PORT, () => {
    console.log(` Server is running on http://localhost:${PORT}`);
});
