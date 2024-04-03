import mongoose from "mongoose";

const FavouriteRecipeSchema = mongoose.Schema({
    user: {
        type: mongoose.ObjectId,
        ref: "User",
        required: true,
    },
    recipe: {
        type: mongoose.ObjectId,
        ref: "Recipe",
        required: true,
    },
}, { tmestamps: true });

const FavouriteRecipe = mongoose.model("FavouriteRecipe", FavouriteRecipeSchema);

export default FavouriteRecipe;