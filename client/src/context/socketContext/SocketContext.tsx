// SocketContext.ts
import { createContext } from "react";
import io from "socket.io-client";

// Use typeof to get the Socket type from the io function return type
type Socket = ReturnType<typeof io>;

export interface SocketContextType {
  socket: Socket | null;
  setSocket: React.Dispatch<React.SetStateAction<Socket | null>>;
}

export const SocketContext = createContext<SocketContextType | null>(null);
