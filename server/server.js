import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:4001", "http://localhost:3000"], // Add multiple origins if needed
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const users = {}; // Store connected users

io.on("connection", (socket) => {
  console.log("New Client connected: ", socket.id);

  const userId = socket.handshake.query.userId;
  console.log("User ID from query:", userId); // Debug log

  if (userId && userId !== "undefined") {
    users[userId] = socket.id;
    console.log("Users object: ", users);

    socket.emit("connected", { userId, socketId: socket.id });
  }

  socket.on("disconnect", () => {
    console.log("Client disconnected: ", socket.id);

    const disconnectedUserId = Object.keys(users).find(
      (key) => users[key] === socket.id
    );
    if (disconnectedUserId) {
      delete users[disconnectedUserId];
      console.log("Updated users after disconnect: ", users);
    }
  });

  socket.on("message", (data) => {
    console.log("Received message:", data);
  });
});

// Start the server
const PORT = process.env.PORT || 5002;
server.listen(PORT, () => {
  console.log(`Socket server running on port ${PORT}`);
});

export { app, io, server };
