import React from "react";
import { MessageCircle } from "lucide-react";
import { useAuth } from "../context/authContext/useAuth";

const NoChat = () => {
  const { authUser } = useAuth(); // ✅ fixed destructuring
   console.log(authUser)

  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-6">
      <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gray-700 mb-6 shadow-md">
        <MessageCircle className="w-10 h-10 text-gray-300" />
      </div>

      <h2 className="text-2xl font-semibold text-gray-200">
        {/* Welcome, {authUser?.name || "User"} 👋 */}
      </h2>

      <p className="mt-2 text-gray-400 max-w-md">
        No conversation selected. Pick a chat from the sidebar to get started,
        or start a new one to connect instantly.
      </p>

      <span className="mt-4 text-sm italic text-gray-500">
        “Every great story begins with a hello…”
      </span>
    </div>
  );
};

export default NoChat;
