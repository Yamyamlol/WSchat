import NoChat from "../../components/NoChat";
// import { useAuth } from "../../context/authContext/useAuth";
import useConversation from "../../states/useConversation";
import ChatUser from "./ChatUser";
// import useGetMessage from "../../context/message/useGetMessage";

const ChatWindow = () => {
  // const { authUser } = useAuth();
  // console.log("chat window for: ", authUser?.user," message: ", authUser?.message)
 const { selectedConversation } = useConversation();
  // const { messages, loading } = useGetMessage();
  // console.log(messages);
  // why is this printing 3 times check it later
  return (
    <div className="w-[75%] bg-gray-400">
      {!selectedConversation ? <NoChat /> : <ChatUser/>}
    </div>
  );
};
export default ChatWindow;
