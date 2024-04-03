import express from "express";
import "./connection/connection.js"
import dotenv from "dotenv";
import userRoutes from "./routes/UserRoutes.js"
import recipeRoutes from "./routes/RecipeRoutes.js"
import commentRoutes from "./routes/CommentRoutes.js"
import favouriteRecipeRoutes from "./routes/FavouriteRecipeRoutes.js"
import cors from "cors";

const app = express();
dotenv.config();
const port = process.env.PORT || 7000;
app.use(cors());
// routes
app.use(express.json());
app.use("/api/v1/users", userRoutes)
app.use("/api/v1/recipes", recipeRoutes)
app.use("/api/v1/comments", commentRoutes)
app.use("/api/v1/favouriteRecipes", favouriteRecipeRoutes)


app.get("/", (req, res) => {
    res.send("hello to home")
});


// using npm i express-formidable for file upload  
app.listen(port, () => {
    console.log(`listening at port ${port}`)
})