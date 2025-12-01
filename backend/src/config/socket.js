import { Message } from "../models/message.model.js";
import { User } from "../models/user.model.js";

export const UserSocketMapper = new Map()

export const initSocket = (io) => {
    io.on("connection", async (socket) => {
        const userId = socket.handshake.auth?.userId;
        if (!userId) return;

        const user = await User.findOne({ clerkId: userId })
        if (!user) return

        if (UserSocketMapper.has(user.id)) {
            UserSocketMapper.get(user.id).push(socket.id);
        } else {
            UserSocketMapper.set(user.id, [socket.id]);
        }

        io.emit("presence:online", { userId: user.id });
        console.log("User connected:", user.id, UserSocketMapper.get(user.id));

        // Joining Channel Room
        socket.on("channel:join", (channelId) => {
            socket.join(channelId)
            console.log(`User ${user.id} joined channel ${channelId}`);
        })
        // Client Side - Todo
        // socket.emit("channel:join", channelId);

        // Sending Message
        socket.on("message:send", async (data) => {
            const { channelId, text } = data;

            if (!channelId || !text.trim()) return

            const message = await Message.create({
                channel: channelId,
                sender: user.id,
                text
            })
            const populated = await message.populate("sender", "name imageUrl");

            io.to(channelId).emit("message:new", populated);
        })

        // Client Side - Todo
        // socket.emit("message:send", {
        //     channelId,
        //     text: message,
        // });

        // Extra Feature
        socket.on("typing:start", (channelId) => {
            if (!channelId) return
            socket.to(channelId).emit("typing:started", { user: user.name });
        })
        socket.on("typing:stop", (channelId) => {
            if (!channelId) return
            socket.to(channelId).emit("typing:stopped", { user: user.name });
        })

        socket.on("disconnect", () => {
            const userSockets = UserSocketMapper.get(user.id) || [];

            const updated = userSockets.filter(id => id !== socket.id);

            if (updated.length === 0) {
                UserSocketMapper.delete(user.id);
                io.emit("presence:offline", { userId: user.id });
            } else {
                UserSocketMapper.set(user.id, updated);
            }

            console.log("User disconnected:", user.id, updated);
        });
    });
};
