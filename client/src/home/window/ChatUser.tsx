import React from "react";
import ChatHeader from "./ChatHeader";
import MessageBox from "./MessageBox";
import Chats from "./Chats";
import useGetMessage from "../../context/message/useGetMessage";
import Loading from "../../components/Loading";
import { useAuth } from "../../context/authContext/useAuth";
import NoChat from "../../components/NoChat";

const ChatUser = () => {
  const { messages, loading } = useGetMessage();
  console.log(messages);
  const { authUser } = useAuth();
  return (
    <>
 

        <div className="h-full flex flex-col justify-between">
          <ChatHeader />
          {loading && <Loading />}
          {!loading && <Chats />}
          <MessageBox />
        </div>

    </>
  );
};

export default ChatUser;
