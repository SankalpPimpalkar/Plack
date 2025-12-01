import { Channel } from "../models/channel.model.js"
import { Message } from "../models/message.model.js"

export async function createChannel(req, res) {
    try {
        const { name, description } = req.body
        const user = req.user

        if (!name || !description) {
            return res
                .status(500)
                .json({ message: "All fields are required (name, description)" })
        }

        const channel = await Channel.create({
            name: name.trim(),
            description: description.trim() || "",
            createdBy: user._id,
            members: [user._id]
        })

        return res
            .status(201)
            .json({ message: "Channel Created", channel })

    } catch (error) {
        console.log("Error in creating channel", error)
        return res
            .status(500)
            .json({ message: "Internal Server Error" })
    }
}

export async function getAvailableChannels(req, res) {
    try {
        const channels = await Channel
            .find()
            .populate("members", "name imageUrl")
            .populate("createdBy", "name imageUrl")

        return res
            .status(200)
            .json({ message: "Fetched Channels", channels })

    } catch (error) {
        console.log("Error in fetching channels", error)
        return res
            .status(500)
            .json({ message: "Internal Server Error" })
    }
}

export async function getChannelDetails(req, res) {
    try {
        const { channelId } = req.params
        const user = req.user

        const channel = await Channel
            .findById(channelId)
            .populate("members", "name imageUrl")
            .populate("createdBy", "name imageUrl")

        if (!channel) {
            return res
                .status(404)
                .json({ message: "Channel Not Found" })
        }

        if (!channel.members.includes(user._id)) {
            return res
                .status(400)
                .json({ message: "Unauthorized Access - You are not a member" })
        }

        const messages = await Message
            .find({ channel: channelId })
            .populate("senderId", "name imageUrl")
            .select("-channel")
            .sort({ createdAt: -1 })
            .limit(25)

        return res
            .status(200)
            .json({
                message: "Fetched Channel Details",
                channel,
                messages
            })

    } catch (error) {
        console.log("Error in fetching channels", error)
        return res
            .status(500)
            .json({ message: "Internal Server Error" })
    }
}

export async function joinChannel(req, res) {
    try {
        const { channelId } = req.params
        const user = req.user

        const channel = await Channel.findById(channelId)

        if (!channel) {
            return res
                .status(404)
                .json({ message: "Channel Not Found" })
        }

        if (channel.members.includes(user._id)) {
            return res
                .status(400)
                .json({ message: "User already a member of this Channel" })
        }

        const updatedChannel = await Channel.findByIdAndUpdate(
            channelId,
            { $addToSet: { members: user._id } },
            { new: true }
        ).populate("members", "name imageUrl")

        return res
            .status(200)
            .json({ message: "User Joined the Channel", updatedChannel })

    } catch (error) {
        console.log("Error in fetching channels", error)
        return res
            .status(500)
            .json({ message: "Internal Server Error" })
    }
}

export async function leaveChannel(req, res) {
    try {
        const { channelId } = req.params
        const user = req.user

        const channel = await Channel.findById(channelId)

        if (!channel) {
            return res
                .status(404)
                .json({ message: "Channel Not Found" })
        }

        await Channel.findByIdAndUpdate(
            channelId,
            { $pull: { members: user._id } },
            { new: true }
        )

        return res
            .status(200)
            .json({ message: "User leaved Channel" })

    } catch (error) {
        console.log("Error in fetching channels", error)
        return res
            .status(500)
            .json({ message: "Internal Server Error" })
    }
}

