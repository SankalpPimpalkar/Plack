import { Router } from "express"
import { createChannel, getAvailableChannels, getChannelDetails, joinChannel, leaveChannel } from "../controllers/channel.controller.js"
import { protectRoute } from "../middlewares/auth.middleware.js"

const channelRouter = Router()

channelRouter.post("/new", protectRoute, createChannel)
channelRouter.get("", protectRoute, getAvailableChannels)
channelRouter.get("/:channelId", protectRoute, getChannelDetails)
channelRouter.patch("/:channelId/join", protectRoute, joinChannel)
channelRouter.patch("/:channelId/leave", protectRoute, leaveChannel)

export default channelRouter