import express from "express";
import { ENV } from "./config/env.config.js";
import { clerkMiddleware } from '@clerk/express'
import { serve } from "inngest/express"
import { Server } from "socket.io"
import { inngest, functions } from "./config/inngest.config.js";
import path from "path"
import http from "http"
import cors from "cors"
import connectDB from "./config/db.config.js";
import { initSocket, UserSocketMapper } from "./config/socket.js";
import channelRouter from "./routes/channel.route.js";
import messageRouter from "./routes/message.route.js";

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: ENV.CLIENT_URL,
        methods: ["GET", "POST"],
        credentials: true
    }
});
const __dirname = path.resolve()

// Middlewares
app.use(express.json())
app.use(clerkMiddleware())
app.use(cors({
    origin: ENV.CLIENT_URL,
    credentials: true,
}));

// Sockets
initSocket(io)

// Routes
app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/channels", channelRouter)
app.use("/api/messages", messageRouter)

app.get("/api/health", (req, res) => {
    return res.status(200).json({ message: "System is running" })
})

app.get("/api/online-users", (req, res) => {
    const online = Array.from(UserSocketMapper.keys());
    return res.status(200).json({ message: "Online users fetched", online })
});


if (ENV.NODE_ENV == "production") {
    app.use(express.static(path.join(__dirname, "../client/dist")));

    app.get("/{*any}", (req, res) => {
        return res
            .sendFile(path.join(__dirname, "../client", "dist", "index.html"))
    })
}

server.listen(ENV.PORT, () => {
    console.log("✅ Server is up and running on port", ENV.PORT)
    connectDB()
})