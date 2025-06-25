import express from "express";
import authMiddleware from "../middleware/auth.js";
import {
  createMood,
  getMoods,
  updateMood,
  deleteMood,
} from "../controllers/moodControllers.js";

const router = express.Router();

router.post("/", authMiddleware, createMood);
router.get("/", authMiddleware, getMoods);
router.put("/:id", authMiddleware, updateMood);
router.delete("/:id", authMiddleware, deleteMood);

export default router;