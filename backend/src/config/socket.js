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

        // Sending Message
        socket.on("message:send", async ({ channelId, text }) => {
            if (!channelId || !text.trim()) return

            const message = await Message.create({
                channel: channelId,
                sender: user.id,
                text
            })
            const populated = await message.populate("sender", "name imageUrl clerkId");
            console.log(`${user._id} send ${text}`)
            io.to(channelId).emit("message:new", populated);
        })

        // Extra Feature
        socket.on("typing:start", (channelId) => {
            if (!channelId) return
            console.log(`${user.name} started typing`)
            socket.to(channelId).emit("typing:started", { name: user.name, clerkId: user.clerkId });
        })
        socket.on("typing:stop", (channelId) => {
            if (!channelId) return
            socket.to(channelId).emit("typing:stopped", { name: user.name, clerkId: user.clerkId });
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
