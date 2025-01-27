import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createVote, getAllVotes, getVoted, getVoteById, voteOnVote, closeVote, bookmarkVote, getBookmarkedVotes, deleteVote } from "../controllers/voteController.js"; 

const router = express.Router();

router.post("/create", protect, createVote)
router.get("/getAllVotes", protect, getAllVotes)
router.get("/voted", protect, getVoted)
router.get("/:id", protect, getVoteById)
router.post("/:id/vote", protect, voteOnVote)
router.post("/:id/close", protect, closeVote)
router.post("/:id/bookmark", protect, bookmarkVote)
router.get("/user/bookmarked", protect, getBookmarkedVotes)
router.delete("/:id/delete", protect, deleteVote)

export default router