// Enhanced User Component
import React from "react";
import useConversation from "../../states/useConversation";
import { type User } from "../../context/socketContext/SocketContext";
import { useSocketContext } from "../../context/socketContext/useSocketContext";

interface UserProps {
  user: {
    _id: string;
    name: string;
    email: string;
  };
}

const User: React.FC<UserProps> = ({ user }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { socket, onlineUsers, isConnected } = useSocketContext();

  const isSelected = selectedConversation?._id === user._id;

  // Check if user is online
  const isOnline = onlineUsers.includes(user._id)

  const handleClick = () => {
    if (isSelected) {
      setSelectedConversation(null);
    } else {
      setSelectedConversation(user);
    }
  };

  return (
    <div
      className={`hover:bg-gray-600 duration-300 ${
        isSelected ? "bg-gray-700" : ""
      }`}
      onClick={handleClick}
    >
      <div className="p-4 flex gap-4 cursor-pointer hover:bg-gray-600 duration-200">
        <div className="relative inline-block">
          <div className="w-16 h-16 rounded-full bg-gray-400"></div>
          {/* Show green dot only if user is online and socket is connected */}
          {isOnline && isConnected && (
            <span className="absolute top-0 right-0 block w-4 h-4 rounded-full bg-green-500 border-2 border-white"></span>
          )}
          {/* Show red dot if socket is disconnected */}
          {!isConnected && (
            <span className="absolute top-0 right-0 block w-4 h-4 rounded-full bg-red-500 border-2 border-white"></span>
          )}
        </div>
        <div className="info text-white flex justify-center flex-col">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold">{user.name}</h1>
            {isOnline && isConnected && (
              <span className="text-green-400 text-xs">●</span>
            )}
          </div>
          <span className="text-gray-400 italic">{user.email}</span>
        </div>
      </div>
    </div>
  );
};

export default User;
