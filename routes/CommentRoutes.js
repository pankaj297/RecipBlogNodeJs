import express from "express";
import { addComment, deleteComment, getAllCommentOfRecipe, getAllComments, updateComment } from "../controllers/CommentController.js";
import { isLoggedIn } from "../middlewares/auth.js";
const router = express.Router();

router.get("/allComments", getAllComments);
router.post("/addComment/:_id", isLoggedIn, addComment);
router.put("/updateComment/:_id/:_cId", isLoggedIn, updateComment);
router.delete("/deleteComment/:_id/:_cId", isLoggedIn, deleteComment);
router.get("/getAllCommentOfRecipe/:_id", getAllCommentOfRecipe);

export default router;