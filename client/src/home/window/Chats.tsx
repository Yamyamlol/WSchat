import React, { useEffect, useRef } from "react";
import useGetMessage from "../../context/message/useGetMessage";
import useGetSocketMessage from "../../context/socketContext/useGetSocketMessage";
import Cookies from "js-cookie";

const MessagesList: React.FC = () => {
  const { messages, loading } = useGetMessage();
  useGetSocketMessage(); // Listen for incoming messages
  const lastMessageRef = useRef<HTMLDivElement | null>(null);

  // Get authenticated user ID
  const stored = Cookies.get("jwt") || localStorage.getItem("token");
  let authUserId: string | null = null;
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      authUserId = parsed.user?._id || null;
    } catch (e) {
      console.error("Invalid token format", e);
    }
  }

  // Scroll to the last message whenever messages update
  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  return (
    <div
      className="h-full w-full p-4 flex flex-col gap-3 overflow-y-auto
      [&::-webkit-scrollbar]:w-2
      [&::-webkit-scrollbar-track]:rounded-full
      [&::-webkit-scrollbar-track]:bg-gray-100
      [&::-webkit-scrollbar-thumb]:rounded-full
      [&::-webkit-scrollbar-thumb]:bg-gray-300
      dark:[&::-webkit-scrollbar-track]:bg-gray-400
      dark:[&::-webkit-scrollbar-thumb]:bg-neutral-700"
      style={{ minHeight: "calc(92vh - 8vh)" }}
    >
      {loading ? (
        <p className="text-center mt-20">Loading messages...</p>
      ) : messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-[20%] text-center space-y-3">
          <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200">
            👋 Welcome to Your Chat
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-sm">
            No messages yet. Start a conversation!
          </p>
        </div>
      ) : (
        messages.map((msg, index) => (
          <div
            key={msg._id || `${index}`}
            ref={index === messages.length - 1 ? lastMessageRef : null}
            className={`flex ${
              msg.senderId === authUserId ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-2xl shadow transition-all duration-200 hover:shadow-md
              ${
                msg.senderId !== authUserId
                  ? "bg-gray-800 text-gray-100 rounded-bl-none"
                  : "bg-gray-200 text-gray-900 rounded-br-none"
              }
              `}
            >
              <div className="break-words">{msg.message }</div>
              {msg.createdAt && (
                <div
                  className={`text-xs mt-1 ${
                    msg.senderId !== authUserId
                      ? "text-gray-300"
                      : "text-gray-500"
                  }`}
                >
                  {new Date(msg.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MessagesList;
