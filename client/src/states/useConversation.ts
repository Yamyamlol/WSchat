import { create } from "zustand";

export interface Conversation {
  _id: string;
  name: string;
  // Add more fields like lastMessage, participants if needed
}

export interface Message {
  _id: string;
  senderId: string;
  receiverId: string;
  message: string; // depending on your backend
  updatedAt?: string;
  createdAt: string;
}

interface ConversationState {
  selectedConversation: Conversation | null;
  setSelectedConversation: (conversation: Conversation | null) => void;

  messages: Message[];
  setMessages: (messages: Message[] | ((prev: Message[]) => Message[])) => void;
}

const useConversation = create<ConversationState>((set) => ({
  selectedConversation: null,
  setSelectedConversation: (conversation) =>
    set({ selectedConversation: conversation }),

  messages: [],
  setMessages: (messages) =>
    set((state) => ({
      messages:
        typeof messages === "function" ? messages(state.messages) : messages,
    })),
}));

export default useConversation;
