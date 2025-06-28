import express from "express";
const router = express.Router(); 

import  protect from "../middleware/authMiddleware.js";
import { updateProfile , changePassword} from "../controllers/userController.js";

router.put("/update", protect, updateProfile);
router.put("/change-password", protect, changePassword);

export default router;
