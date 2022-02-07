import express from "express";
import { getRegisteredCourses } from "../controllers/registrationController";
import { protect } from "../middleware/authMiddleware";
const router = express.Router();

router.route('/').get(protect, getRegisteredCourses);

export default router