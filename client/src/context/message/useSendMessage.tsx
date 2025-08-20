import { useState } from "react";
import useConversation, { type Message } from "../../states/useConversation";
import axios from "axios";
import Cookies from "js-cookie";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { selectedConversation } = useConversation();

  const sendMessage = async (messageText: string) => {
    if (!selectedConversation?._id) {
      console.error("No conversation selected");
      return;
    }

    const getUserId = () => {
      try {
        const userData = Cookies.get("jwt") || localStorage.getItem("token");
        return userData ? JSON.parse(userData).user._id : null;
      } catch (error) {
        console.error("Error parsing user data:", error);
        return null;
      }
    };

    const userId = getUserId();
    if (!userId) {
      console.error("User not authenticated");
      return;
    }

    setLoading(true);

    try {
      console.log("📤 Sending message to server...");

      // Send to server - let Socket.IO handle the real-time update
      const response = await axios.post(
        `/api/message/send/${selectedConversation._id}`,
        { text: messageText },
        { withCredentials: true }
      );

      if (response.data?.success) {
        console.log("✅ Message sent successfully");
        // Don't update state here - let useGetSocketMessage handle it
      }
    } catch (error) {
      console.error("❌ Error in useSendMessage:", error);
      // You could add error handling here, like showing a toast notification
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};

export default useSendMessage;
