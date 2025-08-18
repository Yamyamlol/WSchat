import { useState } from "react";
import useConversation, { type Message } from "../../states/useConversation";
import axios from "axios";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  const sendMessage = async (messageText: string) => {
    if (!selectedConversation?._id) {
      console.error("No conversation selected");
      return;
    }
    const getUserId = () => {
      try {
        const userData = localStorage.getItem("userData"); // or whatever key you use
        return userData ? JSON.parse(userData)._id : null;
      } catch (error) {
        console.error("Error parsing user data:", error);
        return null;
      }
    };
    const userId = getUserId();
    if (!userId) {
      console.error("User not authenticated");
    }
    // Create a proper Message object for local state
    const newMessage: Message = {
      text: messageText,
      timestamp: new Date().toISOString(),
      senderId: getUserId(),
      id: selectedConversation._id,
    };
    setLoading(true);
    try {
      const updatedMessages = [...messages, newMessage];
      setMessages(updatedMessages);

      const response = await axios.post(
        `/api/message/send/${selectedConversation._id}`,
        { text: messageText },
        { withCredentials: true }
      );
      if (response.data) {
        const messagesWithResponse = [...updatedMessages, response.data.newMessage];
        setMessages(messagesWithResponse);
      }
    } catch (error) {
      console.error("Error in useSendMessage: ", error);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};

export default useSendMessage;
