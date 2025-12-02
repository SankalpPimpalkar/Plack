# 📌 Plack — Real-Time Team Chat Application

Plack is a lightweight, Slack-style real-time team chat application built with modern full-stack technologies. Users can authenticate, create channels, join and leave channels, chat with others in real time, and see who is online — all powered by WebSockets, Clerk authentication, and a clean React UI.

This project is designed as a production-ready, scalable chat system with real-time messaging, online presence tracking, and a typing indicator. The backend persists messages and channels in MongoDB, while the frontend provides a smooth, responsive chat interface.

---

## 🚀 Features

### User Authentication
- Secure login/signup powered by Clerk
- User session persistence
- Automatic user syncing using Inngest

### Channels
- Create new channels
- Join & leave existing channels
- Channel information modal (name, description, members)
- View global channels (not joined yet)

### Real-Time Messaging
- Instant messaging using Socket.io
- Messages stored in MongoDB
- Real-time updates across all connected clients
- Auto-scroll to new messages
- Per-channel socket rooms

### Online Users Indicator
- Accurate presence tracking
- Multi-tab support (user stays online as long as at least one tab is open)
- Online/offline broadcast using sockets

### Typing Indicator
- Real-time typing status for each channel
- Smooth debounce handling
- Multi-user typing support

---

## 🛠️ Technologies Used

### Frontend
- React + Vite
- Axios
- Socket.io Client
- TailwindCSS
- Clerk (authentication SDK)

### Backend
- Node.js + Express
- MongoDB + Mongoose
- Socket.io
- Inngest (for syncing Clerk user data)
- Sevella (hosting platform)

---

## ✨ Optional Features Included
- Typing indicator (real-time, per-channel, multi-user)

---

## 📈 Future Scope

Plack is planned to evolve with additional real-time and security features:

- React Native mobile app connected to the same backend
- Encrypted messaging (end-to-end or server-side)
- Private chats / DMs
- Invite codes / joining codes for channels
- User profile system (avatars, status, bio)
- Message reactions, file uploads, and read receipts
- Message search & advanced channel permissions

---

## 📂 Folder Structure

```text
├── README.md
├── backend
│   ├── package.json
│   ├── package-lock.json
│   └── src
│       ├── config
│       │   ├── db.config.js
│       │   ├── env.config.js
│       │   ├── inngest.config.js
│       │   └── socket.js
│       ├── controllers
│       │   ├── channel.controller.js
│       │   └── message.controller.js
│       ├── main.js
│       ├── middlewares
│       │   └── auth.middleware.js
│       ├── models
│       │   ├── channel.model.js
│       │   ├── message.model.js
│       │   └── user.model.js
│       └── routes
│           ├── channel.route.js
│           └── message.route.js
│
├── client
│   ├── README.md
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   ├── package-lock.json
│   ├── public
│   │   └── vite.svg
│   ├── dist
│   │   ├── index.html
│   │   └── assets
│   │       ├── index-pFbLIAbU.js
│   │       └── index-tn0RQdqM.css
│   └── src
│       ├── App.jsx
│       ├── index.css
│       ├── main.jsx
│       ├── lib
│       │   ├── api.js
│       │   └── socket.js
│       ├── context
│       │   ├── ModalProvider.jsx
│       │   └── OnlineUserProvider.jsx
│       ├── pages
│       │   ├── ChannelPage.jsx
│       │   └── LandingPage.jsx
│       └── components
│           ├── ActivityBar.jsx
│           ├── ChatWindow.jsx
│           ├── EmptyChatWindow.jsx
│           ├── ModalRenderer.jsx
│           ├── Sidebar.jsx
│           ├── ui
│           │   ├── Channel.jsx
│           │   ├── ChannelHeader.jsx
│           │   ├── GlobalChannel.jsx
│           │   ├── LogoutBtn.jsx
│           │   ├── MessageBubble.jsx
│           │   ├── MessageInput.jsx
│           │   └── Messages.jsx
│           └── modals
│               ├── ChannelDetailsModal.jsx
│               └── CreateChannelModal.jsx
│
├── package.json
└── package-lock.json
```


---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/SankalpPimpalkar/Plack.git
cd plack
```

### 2️⃣ Configure ENV Variables
```bash
# Backend
NODE_ENV = "development" #or production
PORT = 3000
DB_URL = ""
CLIENT_URL = "http://localhost:5173"
CLERK_PUBLISHABLE_KEY = ""
CLERK_SECRET_KEY = ""
INNGEST_SIGNING_KEY = ""

# Client
VITE_API_URL = "http://localhost:3000"
VITE_CLERK_PUBLISHABLE_KEY = ""
```


### 3️⃣ Build Project And Run
```bash
npm run build
npm run dev #or 
npm run start
```

---

## ⚙️ Socket Events Overview
```bash
message:send
message:new

presence:online

typing:started
typing:stopped
typing:start
typing:stop

channel:join

```

---

## ⚙️ API Overview
```bash
POST /api/channels/new              # create a new channel
GET  /api/channels                  # fetch channels the user has NOT joined
GET  /api/channels/me               # fetch channels the user HAS joined
GET  /api/channels/:channelId       # get channel details
PATCH /api/channels/:channelId/join # join a channel
PATCH /api/channels/:channelId/leave# leave a channel

GET  /api/messages/:channelId       # fetch older messages for infinite scroll

GET  /api/health                    # system status check
GET  /api/online-users              # fetch list of online users (socket-based)

```