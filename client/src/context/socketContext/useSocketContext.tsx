import { useContext } from "react";
import { SocketContext, type SocketContextType } from "./SocketContext";

// Custom hook for using socket context
export const useSocketContext = (): SocketContextType => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocketContext must be used within a SocketProvider");
  }
  return context;
};
