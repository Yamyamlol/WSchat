import React, { useState } from "react";
import { useSocketContext } from "../../context/socketContext/useSocketContext";
import { useAuth } from "../../context/authContext/useAuth";

interface MessageInputProps {
  receiverId: string; // The person you're chatting with
}

const MessageInput: React.FC<MessageInputProps> = ({ receiverId }) => {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { socket, isConnected } = useSocketContext();
  const { authUser } = useAuth();

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !message.trim() ||
      !socket ||
      !authUser?.user?._id ||
      !isConnected ||
      isLoading
    ) {
      return;
    }

    const messageData = {
      _id: Date.now().toString(), // Generate unique ID
      message: message.trim(),
      senderId: authUser.user._id,
      receiverId: receiverId,
      createdAt: new Date().toISOString(),
    };

    console.log("📤 Sending message via socket:", messageData);

    setIsLoading(true);

    try {
      // Send message via Socket.IO
      socket.emit("sendMessage", messageData);

      // Clear input after sending
      setMessage("");
    } catch (error) {
      console.error("❌ Failed to send message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend(e);
    }
  };

  return (
    <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      <form onSubmit={handleSend} className="p-4">
        <div className="flex items-end gap-3">
          <div className="flex-1">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={isConnected ? "Type a message..." : "Connecting..."}
              disabled={!isConnected || isLoading}
              rows={1}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 
                       rounded-lg resize-none focus:outline-none focus:ring-2 
                       focus:ring-blue-500 focus:border-transparent
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                       placeholder-gray-500 dark:placeholder-gray-400
                       disabled:opacity-50 disabled:cursor-not-allowed
                       max-h-32 overflow-y-auto"
              style={{ minHeight: "40px" }}
            />
          </div>

          <button
            type="submit"
            disabled={!message.trim() || !isConnected || isLoading}
            className="px-6 py-2 bg-blue-500 hover:bg-blue-600 
                     disabled:bg-gray-300 disabled:cursor-not-allowed
                     text-white font-medium rounded-lg transition-colors
                     flex items-center justify-center min-w-[80px]"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              "Send"
            )}
          </button>
        </div>

        {/* Connection status indicator */}
        <div className="mt-2 flex items-center justify-between text-sm">
          <div
            className={`flex items-center gap-2 ${
              isConnected ? "text-green-600" : "text-red-600"
            }`}
          >
            <div
              className={`w-2 h-2 rounded-full ${
                isConnected ? "bg-green-500" : "bg-red-500"
              }`}
            />
            {isConnected ? "Connected" : "Disconnected"}
          </div>

          <div className="text-gray-500 dark:text-gray-400">
            Press Enter to send
          </div>
        </div>
      </form>
    </div>
  );
};

export default MessageInput;
