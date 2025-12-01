import { Channel } from "../models/channel.model.js";
import { Message } from "../models/message.model.js";

export async function getOlderMessages(req, res) {
    try {
        const { channelId } = req.params;
        const { cursor } = req.query;
        const user = req.user

        if (!cursor) {
            return res.status(400).json({ message: "Missing 'cursor' query parameter" });
        }

        const channel = await Channel.findById(channelId)

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

        const olderMessages = await Message.find({
            channel: channelId,
            _id: { $lt: cursor }
        })
            .sort({ createdAt: 1 })
            .populate("sender", "name imageUrl")
            .limit(25)
            .select("-channel");

        return res
            .status(200)
            .json({ message: "Fetched Older Messages", olderMessages })

    } catch (error) {
        console.log("Error in fetching Older Messages", error)
        return res
            .status(500)
            .json({ message: "Internal Server Error" })
    }
}
