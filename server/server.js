import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import analyzeRoutes from "./routes/analyzeRoutes.js";
import reportRoutes from "./routes/reportRoutes.js"; // ✅ NEW
import dashboardRoutes from "./routes/dashboardRoutes.js";
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();

// ✅ Middleware
const allowedOrigins = [
  'https://accessi-scan-sneha.vercel.app',
  'https://accessi-scan-sneha-ftm0e0jc8-ssnehaaaas-projects.vercel.app',
  'https://accessi-scan-ten.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));
app.use(express.json()); // Must be before route handling

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/analyze", analyzeRoutes);
app.use("/api/reports", reportRoutes); // ✅ NEW
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/users", userRoutes);

// ✅ Test route
app.get("/", (req, res) => {
  res.send("🚀 Backend server is running!");
});

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🌐 Server running on http://localhost:${PORT}`)
);
