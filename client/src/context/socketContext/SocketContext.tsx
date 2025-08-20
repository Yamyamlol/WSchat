// SocketContext.ts
import { createContext } from "react";
import io from "socket.io-client"; // and then use io(...)
export interface User {
  _id: string;
  name?: string;
  email?: string;
}

type Socket = ReturnType<typeof io>;

export interface SocketContextType {
  socket: Socket | null;
  setSocket: React.Dispatch<React.SetStateAction<Socket | null>>;
  onlineUsers: User[];
  isConnected: boolean;
}

export const SocketContext = createContext<SocketContextType | null>(null);
