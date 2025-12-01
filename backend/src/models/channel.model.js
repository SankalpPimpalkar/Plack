import mongoose from "mongoose";

const channelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true })

export const Channel = mongoose.model("Channel", channelSchema)