import { Paperclip, SendHorizonal, Menu } from "lucide-react";
import React, { useState } from "react";
import useSendMessage from "../../context/message/useSendMessage";
import useConversation from "../../states/useConversation";

const MessageBox = () => {
  const { sendMessage, loading } = useSendMessage();
  const { selectedConversation } = useConversation();

  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("seleceted conversation: ", selectedConversation);
    await sendMessage(message);
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="w-full p-4 flex justify-center">
        <div className="flex items-center gap-3 w-full px-4 py-3 rounded-2xl bg-gray-300 backdrop-blur-md shadow-lg">
          {/* Hamburger / Menu */}
          <button className="p-2 rounded-full hover:bg-gray-500/30 transition-colors">
            <Menu className="text-gray-800" size={22} />
          </button>

          {/* Input Box */}
          <input
            type="text"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            placeholder="Type a message..."
            className="flex-1 text-gray-800 bg-transparent text-gray-100 h-full placeholder-gray-800 outline-none px-2"
          />

          {/* Attach Button */}
          <button className="p-2 rounded-full hover:bg-gray-500/30 transition-colors">
            <Paperclip className="text-gray-800" size={20} />
          </button>

          {/* Send Button */}
          <button type="submit" onClick={handleSubmit} className="p-2 rounded-full bg-blue-600 hover:bg-blue-500 transition-colors shadow-md">
            <SendHorizonal className="text-white" size={20} />
          </button>
        </div>
      </div>
    </form>
  );
};

export default MessageBox;
