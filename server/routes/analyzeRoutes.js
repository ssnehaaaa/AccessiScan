import express from "express";
import { analyzeAccessibility } from "../controllers/auditController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// Simply use POST /
router.post("/", protect, analyzeAccessibility);

export default router;
