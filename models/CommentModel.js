import mongoose from "mongoose";


const CommentModal = mongoose.Schema({
    user: {
        type: mongoose.ObjectId,
        ref: "User",
        required: true,
    },
    comment: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    recipe: {
        type: mongoose.ObjectId,
        ref: "Recipe",
        required: true,
    }

}, { timestamps: true });


const Comment = mongoose.model("Comment", CommentModal);
export default Comment;