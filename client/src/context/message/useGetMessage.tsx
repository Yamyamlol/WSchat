import { useEffect, useState } from "react";
import useConversation from "../../states/useConversation";
import axios from "axios";

function useGetMessage() {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessage = async () => {
      setLoading(true);
      if (selectedConversation && selectedConversation._id) {
        try {
          const response = await axios.get(
            `/api/message/get/${selectedConversation._id}`
          );

          // Extract the messages array from the response
          const messagesArray = response.data?.messages || [];
          setMessages(messagesArray);
        } catch (error) {
          console.log("error in useGetMessage: ", error);
        } finally {
          setLoading(false);
        }
      }
    };
    getMessage();
  }, [selectedConversation, setMessages]);

  return { messages, loading , setMessages};
}

export default useGetMessage;
