import { Router } from "express"
import { protectRoute } from "../middlewares/auth.middleware.js"
import { getOlderMessages } from "../controllers/message.controller.js"

const messageRouter = Router()

messageRouter.get("/:channelId", protectRoute, getOlderMessages)

export default messageRouter