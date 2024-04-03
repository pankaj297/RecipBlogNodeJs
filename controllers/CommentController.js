import Comment from "../models/CommentModel.js";


export const getAllComments = async (req, res) => {
    try { 
        const result = await Comment.find({});
        res.status(200).json({
            success: true,
            result
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Unable to get Comment"
        })
    }
}

export const addComment = async (req, res) => {
    try {
        const recipe = req.params._id;
        const user = req.user;
        const { comment, rating } = req.body;

        if (!recipe) {
            return res.status(500).json({
                success: false,
                message: "Recipe is Required!"
            })
        } else if (!user) {
            return res.status(500).json({
                success: false,
                message: "Please Login !"
            })
        } else if (!comment) {
            return res.status(500).json({
                success: false,
                message: "Write Something to Comment !"
            })
        } else if (!rating) {
            return res.status(500).json({
                success: false,
                message: "Rating is Required !"
            })
        }

        const result = await Comment.create({
            recipe,
            user,
            comment,
            rating
        });

        res.status(200).json({
            success: true,
            result
        })

    } catch (error) { 
        res.status(500).json({
            success: false,
            message: "Unable to Add Comment"
        })
    }
}

export const updateComment = async (req, res) => {
    try {
        const recipe = req.params._id;
        const commentId = req.params._cId;
        const user = req.user;
        const { comment, rating } = req.body;


        if (!recipe) {
            return res.status(500).json({
                success: false,
                message: "Recipe is Required!"
            })
        } else if (!user) {
            return res.status(500).json({
                success: false,
                message: "Please Login !"
            })
        } else if (!comment) {
            return res.status(500).json({
                success: false,
                message: "Write Something to Comment !"
            })
        } else if (!rating) {
            return res.status(500).json({
                success: false,
                message: "Rating is Required !"
            })
        }

        const isMatch = await Comment.findById({ _id: commentId });
        if (!isMatch) {
            return res.status(500).json({
                success: false,
                message: "Comment Not Found!"
            })
        }


        if (user._id !== isMatch.user.toString()) {
            return res.status(500).json({
                success: false,
                message: "Unauthorised Access !"
            })
        }
        const result = await Comment.findByIdAndUpdate(commentId, {
            recipe,
            user,
            comment,
            rating
        }, { new: true });

        await result.save();

        res.status(200).json({
            success: true,
            message: "Update Success",
            result
        })

    } catch (error) { 
        res.status(500).json({
            success: false,
            message: "Unable to Add Comment"
        })
    }
}

export const deleteComment = async (req, res) => {
    try {
        const recipe = req.params._id;
        const commentId = req.params._cId;
        const user = req.user;

        if (!recipe) {
            return res.status(500).json({
                success: false,
                message: "Recipe is Required!"
            })
        } else if (!user) {
            return res.status(500).json({
                success: false,
                message: "Please Login !"
            })
        }
        else if (!commentId) {
            return res.status(500).json({
                success: false,
                message: "Comment Not found !"
            })
        }
        const isMatch = await Comment.findOne({ _id: commentId });

        if (!isMatch) {
            return res.status(500).json({
                success: false,
                message: "Comment Not Found!"
            })
        }


        if (user._id !== isMatch.user.toString()) {
            return res.status(500).json({
                success: false,
                message: "Unauthorised Access !"
            })
        }
        const result = await Comment.deleteOne({ _id: commentId }, { new: true });

        res.status(200).json({
            success: true,
            message: "Comment deleted",
            result
        })

    } catch (error) { 
        res.status(500).json({
            success: false,
            message: "Unable to delete Comment"
        })
    }
}

export const getAllCommentOfRecipe = async (req, res) => {
    const recipe = req.params._id;
    try { 
        const result = await Comment.find({ recipe: recipe });
        res.status(200).json({
            success: true,
            countTotal: result.length,
            result,
        })

    } catch (error) { 
        res.status(500).json({
            success: false,
            message: "Unable to get Comment"
        })
    }
}