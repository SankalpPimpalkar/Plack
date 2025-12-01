import express from "express";
import { ENV } from "./config/env.config.js";
import { clerkMiddleware } from '@clerk/express'
import { serve } from "inngest/express"
import { inngest, functions } from "./config/inngest.config.js";
import path from "path"
import connectDB from "./config/db.config.js";
import channelRouter from "./routes/channel.route.js";

const app = express()
const __dirname = path.resolve()

// Middlewares
app.use(express.json())
app.use(clerkMiddleware())

app.use("/api/inngest", serve({ client: inngest, functions }));

app.use("/api/channels", channelRouter)

app.get("/api/health", (req, res) => {
    return res.status(200).json({ message: "System is running" })
})

if (ENV.NODE_ENV == "production") {
    app.use(express.static(path.join(__dirname, "../client/dist")));

    app.get("/{*any}", (req, res) => {
        return res
            .sendFile(path.join(__dirname, "../client", "dist", "index.html"))
    })
}

app.listen(ENV.PORT, () => {
    console.log("✅ Server is up and running on port", ENV.PORT)
    connectDB()
})