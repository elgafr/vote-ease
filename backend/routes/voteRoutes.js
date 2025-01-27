import express from "express";
import { protect } from "../middleware/authMiddleware";
import { createVote } from "../controllers/voteController"; 

const router = express.Router();

router.post("/create", protect, createVote)

export default router