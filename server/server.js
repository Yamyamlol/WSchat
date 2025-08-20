import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:4001", "http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Store connected users
const users = {}; // userId -> socketId mapping

// Helper function to get receiver's socket ID
export const getReceiverSocketId = (receiverId) => {
  return users[receiverId] || null;
};

io.on("connection", (socket) => {
  console.log("🔗 New Client connected: ", socket.id);

  const userId = socket.handshake.query.userId;
  console.log("👤 User ID from query:", userId);

  if (userId && userId !== "undefined") {
    users[userId] = socket.id;
    console.log("📊 Users object: ", users);

    // Confirm connection to the user
    socket.emit("connected", { userId, socketId: socket.id });
  }

  // Send online users (as user objects, not just IDs)
  const onlineUsers = Object.keys(users).map((userId) => ({
    _id: userId,
  }));
  io.emit("getonline", onlineUsers);

  // Handle incoming messages from client-side socket
  socket.on("sendMessage", (data) => {
    console.log("📨 Received message via socket:", data);

    const { receiverId, message, senderId, _id } = data;

    // Create message object with consistent structure
    const messageData = {
      _id: _id || Date.now().toString(),
      message: message,
      senderId: senderId,
      receiverId: receiverId,
      createdAt: new Date().toISOString(),
    };

    console.log("📤 Broadcasting message via socket:", messageData);

    // Send to specific recipient if online
    if (receiverId && users[receiverId]) {
      io.to(users[receiverId]).emit("newMessage", messageData);
      console.log(`✅ Socket message sent to recipient ${receiverId}`);
    }

    // Also send to sender (so they see their own message)
    if (senderId && users[senderId]) {
      io.to(users[senderId]).emit("newMessage", messageData);
      console.log(`✅ Socket message sent to sender ${senderId}`);
    }
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("❌ Client disconnected: ", socket.id);

    // Find and remove disconnected user
    const disconnectedUserId = Object.keys(users).find(
      (key) => users[key] === socket.id
    );

    if (disconnectedUserId) {
      delete users[disconnectedUserId];
      console.log("Updated users after disconnect: ", users);

      // Update online users for all clients
      const onlineUsers = Object.keys(users).map((userId) => ({
        _id: userId,
      }));
      io.emit("getonline", onlineUsers);
    }
  });
});

// Start the server
const PORT = process.env.PORT || 5002;
server.listen(PORT, () => {
  console.log(`🚀 Socket server running on port ${PORT}`);
  console.log(`🔌 Socket.IO ready for connections`);
});

// Export both app, io, server, and helper function
export { app, io, server };
