import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    recipeName: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.ObjectId,
        ref: "User",
        required: true,
    },
    instructions: {
        type: String,
        required: true,
    },
    recipe: {
        type: String,
        required: true,
    },
    img: {
        data: Buffer,
        contentType: String,
    },
    ingredients: {
        required: true,
        type: String
    },
    cookingTime: {
        required: true,
        type: String
    },

}, { timestamps: true });

const Recipe = mongoose.model("Recipe", UserSchema);
export default Recipe;