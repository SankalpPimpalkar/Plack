import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        default: ""
    },
    clerkId: {
        type: String,
        required: true,
        unique: true
    },
    channels: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Channel"
        }
    ]
}, { timestamps: true })

export const User = mongoose.model("User", userSchema)