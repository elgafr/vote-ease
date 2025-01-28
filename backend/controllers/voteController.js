import Vote from "../models/Vote.js";

export const createVote = async (req, res) => {
  const { question, type, options, creatorId } = req.body;

  if (!question || !type || !creatorId) {
    return res
      .status(400)
      .json({ message: "Question, type, and creatorId are required" });
  }

  try {
    let processedOptions = [];
    switch (type) {
      case "single-choice":
        if (!options || options.length < 2) {
          return res.status(400).json({
            message: "Single-choicce vote must have at least two options",
          });
        }
        processedOptions = options.map((option) => ({ optionText: option }));
        break;

      case "rating":
        processedOptions = [1, 2, 3, 4, 5].map((value) => ({
          optionText: value.toString(),
        }));
        break;

      case "yes/no":
        processedOptions = ["Yes", "No"].map((option) => ({
          optionText: option,
        }));
        break;

      case "image-based":
        if (!options || options.length < 2) {
          return res.status(400).json({
            message: "Image-based vote must have at least two image URLs",
          });
        }
        processedOptions = options.map((url) => ({ optionText: url }));
        break;

      case "open-ended":
        processedOptions = [];
        break;
      default:
        return res.status(400).json({ message: "Invalid vote type" });
    }

    const newVote = await Vote.create({
      question,
      type,
      options: processedOptions,
      creator: creatorId,
    });
    res.status(201).json(newVote);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating vote", error: error.message });
  }
};

export const getAllVotes = async (req, res) => {
  const { type, creatorId, page = 1, limit = 10 } = req.query;
  const filter = {};
  const userId = req.user._id;

  if (type) filter.type = type;
  if (creatorId) filter.creator = creatorId;

  try {
    const pageNumber = parseInt(page, 10);
    const pageSize = parseInt(limit, 10);
    const skip = (pageNumber - 1) * pageSize;

    const votes = await Vote.find(filter)
      .populate("creator", "fullName username email profileImageUrl")
      .populate({
        path: "responses.voterId",
        select: "username email profileImageUrl",
      })
      .skip(skip)
      .limit(pageSize)
      .sort({ createdAt: -1 });

    const updatedVotes = votes.map((vote) => {
      const userHasVoted = vote.voters.some((voterId) =>
        voterId.equals(userId)
      );
      return {
        ...vote.toObject(),
        userHasVoted,
      };
    });

    const totalVotes = await Vote.countDocuments(filter);

    const stats = await Vote.aggregate([
      {
        $group: {
          _id: "$type",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          type: "$_id",
          count: 1,
          _id: 0,
        },
      },
    ]);

    const allTypes = [
      { type: "single-choice", label: "Single Choice" },
      { type: "yes/no", label: "Yes/No" },
      { type: "rating", label: "Rating" },
      { type: "image-based", label: "Image Based" },
      { type: "open-ended", label: "Open Ended" },
    ];

    const statsWithDefaults = allTypes
        .map((voteType) => {
            const stat = stats.find((item) => item.type === voteType.type)
            return {
                label: voteType.label,
                type: voteType.type,
                count: stat ? stat.count : 0,
            }
        })
        .sort((a, b) => b.count - a.count)

    res.status(200).json({
        votes: updatedVotes,
        currentPage: pageNumber,
        totalPages: Math.ceil(totalVotes / pageSize),
        totalVotes,
        stats: statsWithDefaults,
    })
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error getting votes", error: error.message });
  }
};

export const getVoted = async (req, res) => {
  try {
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error getting voted votes", error: error.message });
  }
};

export const getVoteById = async (req, res) => {
  try {
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error getting vote by id", error: error.message });
  }
};

export const voteOnVote = async (req, res) => {
  try {
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error getting vote on vote", error: error.message });
  }
};

export const closeVote = async (req, res) => {
  try {
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error closing vote", error: error.message });
  }
};

export const bookmarkVote = async (req, res) => {
  try {
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error bookmarking vote", error: error.message });
  }
};

export const getBookmarkedVotes = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({
      message: "Error getting bookmarked votes",
      error: error.message,
    });
  }
};

export const deleteVote = async (req, res) => {
  try {
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting vote", error: error.message });
  }
};
