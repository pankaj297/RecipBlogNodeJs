import express from "express";
import { createUser, getAllUsers, getSingleUser, getSingleUserImg, loginUser } from "../controllers/UserController.js";
import formidable from "express-formidable";
import { isLoggedIn } from "../middlewares/auth.js";
const router = express.Router();

router.get("/", getAllUsers);
router.get("/singleUser/:_id", getSingleUser);
router.get("/singleUserImg/:_id", getSingleUserImg);
router.post("/createUser", formidable(), createUser);
router.post("/loginUser", loginUser);
router.post("/checkAuth", isLoggedIn, (req, res) => {
    res.status(200).send({ ok: true });
});


export default router;
