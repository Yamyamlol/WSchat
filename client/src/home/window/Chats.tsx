import React, { useEffect, useRef } from "react";
import useGetMessage from "../../context/message/useGetMessage";

const Chats = () => {
  const { messages, loading } = useGetMessage();

  const lastMessageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]); // run whenever messages change

  const stored = localStorage.getItem("token");
  let authUserId: string | null = null;

  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      authUserId = parsed.user?._id || null;
    } catch (e) {
      console.error("Invalid token format", e);
    }
  }

  return (
    <div
      className="h-full w-full p-4 flex flex-col gap-3 overflow-y-auto [&::-webkit-scrollbar]:w-2
      [&::-webkit-scrollbar-track]:rounded-full
      [&::-webkit-scrollbar-track]:bg-gray-100
      [&::-webkit-scrollbar-thumb]:rounded-full
      [&::-webkit-scrollbar-thumb]:bg-gray-300
      dark:[&::-webkit-scrollbar-track]:bg-gray-400
      dark:[&::-webkit-scrollbar-thumb]:bg-neutral-700"
    >
      {!loading && messages.length === 0 && (
        <div className="flex flex-col items-center justify-center mt-[20%] text-center space-y-3">
          <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200">
            👋 Welcome to Your Chat
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-sm">
            No messages yet. Start a conversation and break the silence!
          </p>
          <span className="text-sm italic text-gray-400 dark:text-gray-500">
            "Every great story begins with a hello..."
          </span>
        </div>
      )}

      {messages.map((msg, index) => (
        <div
          key={msg.id || index}
          ref={index === messages.length - 1 ? lastMessageRef : null} // attach ref to last message
          className={`flex ${
            msg.senderId === authUserId ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`max-w-xs px-4 py-2 rounded-2xl shadow 
              ${
                msg.senderId !== authUserId
                  ? "bg-gray-800 text-gray-100 rounded-bl-none"
                  : "bg-gray-200 text-gray-900 rounded-br-none"
              } `}
          >
            {msg.message}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chats;
