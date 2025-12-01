import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    channel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Channel",
        required: true
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    text: {
        type: String,
        required: true,
        trim: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

export const Message = mongoose.model("Message", messageSchema)