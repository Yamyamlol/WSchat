import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
export const sendMessage = async (req, res) => {
  try {
    const { text, message } = req.body;
    const content = text || message; // support either key
    console.log("in send message: ", req.user, "params: ", req.params);

    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    if (!content) {
      return res.status(400).json({ message: "Message text is required" });
    }

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message: content,
    });

    conversation.messages.push(newMessage._id);

    await Promise.all([conversation.save(), newMessage.save()]);

    return res
      .status(201)
      .json({ message: "Message sent successfully", newMessage });
  } catch (error) {
    console.log("Error in sending message,", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMessage = async (req, res) => {
  try {
    const { id: chatuser } = req.params;
    const senderId = req.user._id;
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, chatuser] },
    }).populate("messages"); //idk why i did this search for it
    if (!conversation)
      return res.status(201).json({ message: "No conversation found" });
    const messages = conversation.messages;
    return res.status(201).json({ messages });
  } catch (error) {
    console.log("Error in sending message, ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
