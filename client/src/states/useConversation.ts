import { create } from "zustand";

export interface Conversation {
  _id: string;
  name: string;
  // add other fields (lastMessage, participants, etc.) if needed
}

export interface Message {
  id?: string;
  senderId?: string;
  text: string;
  timestamp?: string;
  message?: string,
}

interface ConversationState {
  selectedConversation: Conversation | null;
  setSelectedConversation: (conversation: Conversation | null) => void;

  messages: Message[];
  setMessages: (messages: Message[]) => void;
}

const useConversation = create<ConversationState>((set) => ({
  selectedConversation: null,
  setSelectedConversation: (conversation) =>
    set({ selectedConversation: conversation }),

  messages: [],
  setMessages: (messages) => set({ messages }),
}));

export default useConversation;
