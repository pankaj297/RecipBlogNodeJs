import FavouriteRecipe from "../models/FavouriteRecipeModel.js";
import Recipe from "../models/RecipeModel.js";

export const removeFromFavourite = async (req, res) => {
  try {
    const recipeId = req.params._rId;
    const userId = req.params._uId;

    const isMatch = await FavouriteRecipe.findOne({
      recipe: recipeId,
      user: userId,
    });

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Recipe Not Found",
      });
    }

    if (isMatch.user.toString() !== userId) {
      return res.status(400).json({
        success: false,
        message: "Unauthorised Access",
      });
    }

    const result = await FavouriteRecipe.deleteOne({
      recipe: recipeId,
      user: userId,
    });

    res.status(200).json({
      success: true,
      message: "Removed From Favourite",
      result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to Remove",
    });
  }
};

export const addToFavourite = async (req, res) => {
  try {
    const recipe = req.params._rId;
    const user = req.params._uId;
    const isMatch = await FavouriteRecipe.findOne({
      recipe: recipe,
      user: user,
    });
    if (isMatch) {
      return res.status(500).json({
        success: false,
        message: "Recipe Already Present",
      });
    }

    const result = await FavouriteRecipe.create({ recipe, user });

    res.status(201).json({
      success: true,
      message: "Added to Favourite",
      result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to Add",
    });
  }
};

export const getAllFavourite = async (req, res) => {
  try {
    const user = req.params._uId;

    const result = await FavouriteRecipe.find({ user: user });
    const userFavRecipesIds = result.map((item) => item.recipe);
    let favRecipes = await Recipe.find({ _id: { $in: userFavRecipesIds } });

    res.status(200).json({
      success: true,
      message: "Your Favourite Recipes",
      favRecipes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to get recipes",
    });
  }
};
