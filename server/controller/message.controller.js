import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../server.js"; // Import BOTH functions

export const sendMessage = async (req, res) => {
  try {
    const { text, message } = req.body;
    const content = text || message; // support either key
    console.log("📨 In send message - User:", req.user, "Params:", req.params);

    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    if (!content) {
      return res.status(400).json({ message: "Message text is required" });
    }

    // Find or create conversation
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
      console.log("📁 Created new conversation");
    }

    // Create new message
    const newMessage = new Message({
      senderId,
      receiverId,
      message: content,
    });

    conversation.messages.push(newMessage._id);

    // Save both conversation and message
    await Promise.all([conversation.save(), newMessage.save()]);
    console.log("💾 Message saved to database");

    // Socket.IO real-time messaging
    const receiverSocketId = getReceiverSocketId(receiverId);
    const senderSocketId = getReceiverSocketId(senderId.toString());

    console.log("🔍 Receiver socket ID:", receiverSocketId);
    console.log("🔍 Sender socket ID:", senderSocketId);

    // Create message data for socket emission
    const messageData = {
      _id: newMessage._id.toString(),
      message: newMessage.message,
      senderId: newMessage.senderId.toString(),
      receiverId: newMessage.receiverId.toString(),
      createdAt: newMessage.createdAt.toISOString(),
    };

    // Send to receiver if online
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", messageData);
      console.log("📤 Message sent to receiver via socket");
    } else {
      console.log("⚠️ Receiver is offline");
    }

    // Send to sender if online (so they see their own message)
    if (senderSocketId) {
      io.to(senderSocketId).emit("newMessage", messageData);
      console.log("📤 Message sent to sender via socket");
    }

    return res.status(201).json({
      success: true,
      message: "Message sent successfully",
      newMessage: messageData,
    });
  } catch (error) {
    console.error("❌ Error in sending message:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getMessage = async (req, res) => {
  try {
    const { id: chatuser } = req.params;
    const senderId = req.user._id;

    console.log("📖 Getting messages between:", senderId, "and", chatuser);

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, chatuser] },
    }).populate("messages");

    if (!conversation) {
      console.log("📭 No conversation found");
      return res.status(200).json({
        success: true,
        message: "No conversation found",
        messages: [],
      });
    }

    const messages = conversation.messages;
    console.log("📬 Found", messages.length, "messages");

    return res.status(200).json({
      success: true,
      messages,
    });
  } catch (error) {
    console.error("❌ Error in getting messages:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
