import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
        required: true,
    },
    img: {
        data: Buffer,
        contentType: String,
    },
    password: {
        required: true,
        type: String
    }

}, { timestamps: true });

export default mongoose.model("User", UserSchema);
