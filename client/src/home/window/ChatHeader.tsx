import { Menu, PhoneCall, Video } from "lucide-react";
import useConversation from "../../states/useConversation";
import { useSocketContext } from "../../context/socketContext/useSocketContext";
import React from "react";

const ChatHeader = () => {
  const { selectedConversation } = useConversation();
  const { onlineUsers, isConnected } = useSocketContext();

  const senderName = selectedConversation
    ? selectedConversation.name
    : "INVALID NAME";

  // Check if the selected user is online
  const isUserOnline = React.useMemo(() => {
    if (!selectedConversation || !Array.isArray(onlineUsers)) {
      return false;
    }

    // Handle both object format [{_id: "123"}] and string format ["123"]
    const hasUserObjects =
      onlineUsers.length > 0 && typeof onlineUsers[0] === "object";

    if (hasUserObjects) {
      return onlineUsers.some(
        (onlineUser: any) => onlineUser._id === selectedConversation._id
      );
    } else {
      return onlineUsers.includes(selectedConversation._id);
    }
  }, [onlineUsers, selectedConversation]);

  console.log("selected conversation: ", selectedConversation);
  console.log("User online status:", {
    isUserOnline,
    isConnected,
    onlineUsers,
  });

  // Determine status text and color
  const getStatusInfo = () => {
    if (!isConnected) {
      return { text: "Disconnected", color: "text-red-400" };
    }
    if (!selectedConversation) {
      return { text: "No chat selected", color: "text-gray-400" };
    }
    if (isUserOnline) {
      return { text: "Online", color: "text-green-400" };
    }
    return { text: "Offline", color: "text-gray-400" };
  };

  const statusInfo = getStatusInfo();

  return (
    <div className="w-full flex justify-between gap-2 px-8 p-4 bg-gray-700 border-b border-gray-600">
      <div className="flex gap-8">
        <div className="relative inline-block">
          <div className="w-14 h-14 rounded-full bg-gray-400 flex items-center justify-center">
            {/* Add user initials if no avatar */}
            <span className="text-gray-700 font-semibold text-3xl">
              {senderName.charAt(0).toUpperCase()}
            </span>
          </div>

          {/* Show status dot based on connection and user online status */}
          {isConnected && isUserOnline && (
            <span className="absolute top-0 right-0 block w-4 h-4 rounded-full bg-green-500 border-2 border-white ring-1 ring-green-300 animate-pulse"></span>
          )}

          {isConnected && !isUserOnline && selectedConversation && (
            <span className="absolute top-0 right-0 block w-4 h-4 rounded-full bg-gray-500 border-2 border-white"></span>
          )}

          {!isConnected && (
            <span className="absolute top-0 right-0 block w-4 h-4 rounded-full bg-red-500 border-2 border-white ring-1 ring-red-300"></span>
          )}
        </div>

        <div className="info text-white flex justify-center flex-col">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-semibold">{senderName}</h1>

            {/* Online indicator dot next to name */}
            {isConnected && isUserOnline && (
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            )}
          </div>

          <div className="flex items-center gap-1">
            <span className={`text-md italic ${statusInfo.color}`}>
              {statusInfo.text}
            </span>

            {/* Last seen info could go here */}
            {!isUserOnline && selectedConversation && isConnected && (
              <span className="text-md text-gray-500 ml-2">
                • Last seen recently
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-3 items-center">
        {/* Disable actions if user is offline */}
        <PhoneCall
          className={`cursor-pointer transition-colors ${
            isUserOnline
              ? "hover:text-green-400 text-white"
              : "text-gray-500 cursor-not-allowed"
          }`}
          size={28}
          onClick={() => isUserOnline && console.log("Call initiated")}
        />
        <Video
          className={`cursor-pointer transition-colors ${
            isUserOnline
              ? "hover:text-blue-400 text-white"
              : "text-gray-500 cursor-not-allowed"
          }`}
          size={28}
          onClick={() => isUserOnline && console.log("Video call initiated")}
        />
        <Menu
          className="cursor-pointer text-white hover:text-gray-300 transition-colors"
          size={28}
        />
      </div>
    </div>
  );
};

export default ChatHeader;
