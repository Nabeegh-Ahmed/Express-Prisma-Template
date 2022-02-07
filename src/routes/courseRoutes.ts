import express from "express";
import { createCourse, getCourse, searchCourse } from "../controllers/courseController";
import { protect } from "../middleware/authMiddleware";
const router = express.Router();

router.route('/create').post(protect, createCourse)
router.route('/search').get(searchCourse)
router.route('/:id').get(getCourse)
export default router