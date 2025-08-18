import { Menu, PhoneCall, Video } from "lucide-react";
import useConversation from "../../states/useConversation";

const ChatHeader = () => {
  const { selectedConversation } = useConversation();
  const senderName = selectedConversation
    ? selectedConversation.name
    : "INVALID NAME";
  console.log("seleceted conversation: ", selectedConversation);

  return (
    <div>
      <div className="w-full flex justify-between gap-2 px-8 p-4 bg-gray-700">
        <div className="flex gap-3">
          <div className="relative inline-block">
            <div className="w-12 h-12 rounded-full bg-gray-400"></div>
            <span className="absolute top-0 right-0 block w-4 h-4 rounded-full bg-green-500 border-2 border-white"></span>
          </div>
          <div className="info text-white flex justify-center flex-col">
            <h1 className="text-xl font-semibold">{senderName}</h1>
            <span className="text-gray-400 italic">online</span>
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <PhoneCall className="cursor-pointer" color="white" size={28} />
          <Video className="cursor-pointer" color="white" size={28} />
          <Menu className="cursor-pointer" color="white" size={28} />
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
