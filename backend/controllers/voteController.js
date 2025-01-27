import Vote from "../models/Vote.js";

export const createVote = async (req, res) => {
    const { question, type, options, creatorId  } = req.body

    if(!question || !type || !creatorId) {
        return res.status(400).json({ message: "Question, type, and creatorId are required" });
    }

    try {
        let processedOptions = []
        switch (type) {
            case "single-choice":
                if(!options || options.length < 2) {
                    return res.status(400).json({ message: "Single-choicce vote must have at least two options" });
                }
                processedOptions = options.map((option) => ({ optionText: option }));
                break;
            
            case "rating": 
                processedOptions = [1, 2, 3, 4, 5].map((value) => ({
                    optionText: value.toString(),
                }))
                break;

            case "yes/no":
                processedOptions = ["Yes", "No"].map((option) => ({ 
                    optionText: option
                }))
                break

            case "image-based":
                if(!options || options.length < 2) {
                    return res.status(400).json({ message: "Image-based vote must have at least two image URLs" });
                }
                processedOptions = options.map((url) => ({ optionText: url }));
                break;


            case "open-ended":
                processedOptions = []
                break;
            default:
                return res.status(400).json({ message: "Invalid vote type" });
        }

        const newVote = await Vote.create({
            question,
            type,
            options: processedOptions,
            creator: creatorId
        })
        res.status(201).json(newVote)

    } catch (error) {    
        res.status(500).json({ message: "Error creating vote", error: error.message })
    }
}