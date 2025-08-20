// useGetSocketMessage.ts - CORRECTED
import { useEffect } from "react";
import { useSocketContext } from "./useSocketContext";
import useConversation, { type Message } from "../../states/useConversation";
import sound from "../../assets/notification.mp3";

const useGetSocketMessage = () => {
  const { socket } = useSocketContext();
  const { setMessages } = useConversation(); // Remove messages from destructuring

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (newMessage: Message) => {
      // Add error handling for audio
      const notification = new Audio(sound);
      notification.play().catch((error) => {
        console.warn("Could not play notification sound:", error);
      });

      // Use functional update to avoid stale closure
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    console.log("Setting up newMessage listener");
    socket.on("newMessage", handleNewMessage);

    return () => {
      console.log("Cleaning up newMessage listener");
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket, setMessages]); // Remove messages from dependencies
};

export default useGetSocketMessage;
