import UserModel from "../models/UserModel.js";
import bcrypt from "bcrypt"
import fs from "fs"
import JWT from "jsonwebtoken"
export const getAllUsers = (req, res) => {
    res.send("all users is here ");
}

export const getSingleUser = async (req, res) => {
    try {
        const result = await UserModel.findById(req.params._id).select("-img -password");
        res.status(200).json({
            success: true,
            result
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching User",
        })
    }
}


export const getSingleUserImg = async (req, res) => {
    try {
        const result = await UserModel.findById(req.params._id).select("img");
        if (result.img.data) {
            res.set("Content-type", result.img.contentType)
            return res.status(200).send(result.img.data)
        }
        res.status(200).json({
            success: true,
            result
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching User",
        })
    }
}




export const createUser = async (req, res) => {

    const { name, email, bio, password } = req.fields;
    const { img } = req.files;

    if (!name) {
        return res.status(500).json({
            success: false,
            message: "Name is Required!"
        })
    } else if (!email) {
        return res.status(500).json({
            success: false,
            message: "Email is Required!"
        })
    } else if (!bio) {
        return res.status(500).json({
            success: false,
            message: "Bio is Required!"
        })
    } else if (!password) {
        return res.status(500).json({
            success: false,
            message: "Password is Required!"
        })
    } else if (!img || img.size < 10000) {
        return res.status(500).json({
            success: false,
            message: "Profile Image is Required! & should be less thatn 1 MB"
        })
    }

    try {

        const isPresent = await UserModel.findOne({ email });
        if (isPresent) {
            return res.status(400).json({
                success: false,
                message: "Please Login or Use Another email !"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 12);

        // const data = await UserModel.create({ name, email, bio, password: hashedPassword, img });
        const data = new UserModel({ name, email, bio, password: hashedPassword });

        if (img) {
            data.img.data = fs.readFileSync(img.path);
            data.img.contentType = img.type;
        }
        await data.save();
        res.status(201).json({
            success: true,
            message: "Registration Success",
            data: {
                email: data.email,
                name: data.name,
                bio: data.bio,
            }
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Unable to Sign Up"
        })
    }
}

export const loginUser = async (req, res) => {

    const { email, password } = req.body;
    if (!email) {
        return res.status(500).json({
            success: false,
            message: "Email is Required!"
        })
    } else if (!password) {
        return res.status(500).json({
            success: false,
            message: "Password is Required!"
        })
    }

    try {


        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(500).json({
                success: false,
                message: "Invalid Creadentials!"
            })
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(500).json({
                success: false,
                message: "Invalid Creadentials!"
            })
        }
        const token = JWT.sign({ _id: user._id }, process.env.JWTSECRET, { "expiresIn": "7d" });

        res.status(200).json({
            success: true,
            message: "Login Success",
            user: {
                name: user.name,
                _id: user._id,
                email: user.email,
                bio: user.bio,

            }, token

        })



    } catch (err) { 
        res.status(500).json({
            success: false,
            message: "Unable to Login"
        })
    }
}