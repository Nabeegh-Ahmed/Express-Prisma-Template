import express from "express"
import { approveRequest, createJoinRequest, getRequests, rejectRequest } from "../controllers/requestController"
import { protect } from "../middleware/authMiddleware"
const router = express.Router()

router.route('/create').post(protect, createJoinRequest)
router.route('/approve').post(protect, approveRequest)
router.route('/reject').post(protect, rejectRequest)
router.route('/').get(protect, getRequests)

export default router