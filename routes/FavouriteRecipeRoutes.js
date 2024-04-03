
import express from "express";
import { isLoggedIn } from "../middlewares/auth.js";
import { addToFavourite, getAllFavourite, removeFromFavourite } from "../controllers/FavouriteRecipeController.js";
const router = express.Router();

router.get("/getFavourite/:_uId", isLoggedIn, getAllFavourite);
router.post("/addToFavourite/:_uId/:_rId", isLoggedIn, addToFavourite);
router.delete("/removeFromFavourite/:_uId/:_rId", isLoggedIn, removeFromFavourite);


// router.put("/removeFromFavourite/:_id/:_cId", isLoggedIn, updateComment);
// router.get("/getAllCommentOfProduct/:_id", getAllCommentOfRecipe);

export default router;