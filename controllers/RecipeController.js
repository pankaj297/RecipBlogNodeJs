import Recipe from "../models/RecipeModel.js";
import fs from "fs"


export const getAllRecipes = async (req, res) => {
    try {
        const result = await Recipe.find({}).sort({ createdAt: -1 }).select("-img");
        res.status(200).json({
            success: true,
            result
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching Recipes",
        })
    }
}

export const getMyRecipes = async (req, res) => {
    if (!req.params._uId) {
        return res.status(500).json({
            success: false,
            message: "Error fetching Recipes",
        })
    }
    try {
        const result = await Recipe.find({ user: req.params._uId }).sort({ createdAt: -1 }).select("-img");
        res.status(200).json({
            success: true,
            result
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching Recipes",
        })
    }
}

export const getSingleRecipe = async (req, res) => {
    if (!req.params._id) {
        return res.status(500).json({
            success: false,
            message: "Error fetching Recipes",
        })
    }
    try {
        const result = await Recipe.findById(req.params._id).select("-img");
        res.status(200).json({
            success: true,
            result
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching Recipes",
        })
    }
}

export const getSingleRecipeImg = async (req, res) => {
    try {
        if (!req?.params?._id) {
            return res.status(500).json({
                success: false,
                message: "Error fetching Recipes",
            })
        }
        if (req.params._id !== undefined) {

            const result = await Recipe.findById(req.params._id).select("img");

            if (result.img.data) {
                res.set("Content-type", result.img.contentType)
                return res.status(200).send(result.img.data)
            }
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch Img",
        })
        console.log(error)
    }
}

export const addRecipe = async (req, res) => {


    try {
        const { recipeName, instructions, recipe, ingredients, cookingTime } = req.fields;
        const { img } = req.files;
        const rUser = req.user._id;



        if (!recipeName) {
            return res.status(500).json({
                success: false,
                message: "Recipe Name is Required!"
            })
        } else if (!instructions) {
            return res.status(500).json({
                success: false,
                message: "Instructions is Required!"
            })
        } else if (!recipe) {
            return res.status(500).json({
                success: false,
                message: "Recipe is Required!"
            })
        } else if (!ingredients) {
            return res.status(500).json({
                success: false,
                message: "Ingredients is Required!"
            })

        } else if (!img) {
            return res.status(500).json({
                success: false,
                message: "Img is Required!"
            })
        } else if (!cookingTime) {
            return res.status(500).json({
                success: false,
                message: "Cooking Time is Required !"
            })
        }
        else if (!rUser) {
            return res.status(500).json({
                success: false,
                message: "Please Login User is Required !"
            })
        }


        const uRecipe = new Recipe({ recipeName, instructions, ingredients, recipe, cookingTime, user: rUser });

        if (img) {
            uRecipe.img.data = fs.readFileSync(img.path);
            uRecipe.img.contentType = img.type;
        }
        await uRecipe.save();
        res.status(201).json({
            success: true,
            message: "Recipe Added Successfully",
            uRecipe
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error",
        })
    }
}


export const updateRecipe = async (req, res) => {


    try {
        const { recipeName, instructions, recipe, ingredients, cookingTime } = req.fields;
        const { img } = req.files;
        const rUser = req.user._id;


        if (!recipeName) {
            return res.status(500).json({
                success: false,
                message: "Recipe Name is Required!"
            })
        } else if (!instructions) {
            return res.status(500).json({
                success: false,
                message: "Instructions is Required!"
            })
        } else if (!recipe) {
            return res.status(500).json({
                success: false,
                message: "Recipe is Required!"
            })
        } else if (!ingredients) {
            return res.status(500).json({
                success: false,
                message: "Ingredients is Required!"
            })

        } 
        else if (!cookingTime) {
            return res.status(500).json({
                success: false,
                message: "Cooking Time is Required !"
            })
        }
        else if (!rUser) {
            return res.status(500).json({
                success: false,
                message: "Please Login User is Required !"
            })
        }

        else if (img && img.size > 1000000) {

            return res.status(500).send({ success: false, message: "Photo should be less than 1 MB" });
        }

        const isMatch = await Recipe.findOne({ _id: req.params._id });
        if (!isMatch) {
            return res.status(500).json({
                success: false,
                message: "Recipe Not Present !"
            })
        }


        if (isMatch.user.toString() !== req.user._id) {
            return res.status(500).json({
                success: false,
                message: "Unauthorised Access !"
            })
        }

        // const uRecipe = await Recipe.findByIdAndUpdate(req.params._id, { recipeName, instructions, ingredients, recipe, cookingTime, user: rUser }, { new: true });
        const uRecipe = await Recipe.findByIdAndUpdate(req.params._id, { ...req.fields }, { new: true });

        if (img) {
            uRecipe.img.data = fs.readFileSync(img.path);
            uRecipe.img.contentType = img.type;
        }

        await uRecipe.save();
        res.status(201).json({
            success: true,
            message: "Recipe Updated",
            uRecipe
        })

    } catch (error) { 
        res.status(500).json({
            success: false,
            message: "Server Error",
        })
    }
}


export const deleteRecipe = async (req, res) => {


    try {
        const rUser = req.user._id;

        if (!rUser) {
            return res.status(500).json({
                success: false,
                message: "Please Login User is Required !"
            })
        }


        const isMatch = await Recipe.findOne({ _id: req.params._id });
        if (!isMatch) {
            return res.status(500).json({
                success: false,
                message: "Recipe Not Present !"
            })
        }


        if (isMatch.user.toString() !== req.user._id) {
            return res.status(500).json({
                success: false,
                message: "Unauthorised Access !"
            })
        }

        const uRecipe = await Recipe.deleteOne({ _id: req.params._id }, { new: true });
        res.status(201).json({
            success: true,
            message: "Recipe Deleted",
            uRecipe
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error",
        })
        console.log(error)
    }
}

