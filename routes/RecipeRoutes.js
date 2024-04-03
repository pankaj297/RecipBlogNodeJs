
import express from "express";
import { isLoggedIn } from "../middlewares/auth.js";
import { addRecipe, deleteRecipe, getAllRecipes, getMyRecipes, getSingleRecipe, getSingleRecipeImg, updateRecipe } from "../controllers/RecipeController.js";
import formidableMiddleware from "express-formidable";



const router = express.Router();
router.use(formidableMiddleware());  // Used the middleware here

router.get("/allRecipes", getAllRecipes);
router.get("/myRecipes/:_uId", getMyRecipes);
router.get("/singleRecipeImg/:_id", getSingleRecipeImg);
router.get("/singleRecipe/:_id", getSingleRecipe);
router.post("/addRecipe", isLoggedIn, addRecipe);
router.put("/updateRecipe/:_id", isLoggedIn, updateRecipe);
router.delete("/deleteRecipe/:_id", isLoggedIn, deleteRecipe);

export default router;