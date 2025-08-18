// SocketProvider.tsx
import React, { useEffect, useState, type ReactNode } from "react";
import io from "socket.io-client";
import { useAuth } from "../authContext/useAuth";
import { SocketContext } from "./SocketContext";

// Use the same Socket type definition
type Socket = ReturnType<typeof io>;

interface SocketProviderProps {
  children: ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const { authUser } = useAuth();

  useEffect(() => {
    if (authUser) {
      const newSocket = io("http://localhost:5002", {
        query: { userId: authUser.user._id },
      });

      setSocket(newSocket);

      return () => {
        newSocket.disconnect();
      };
    } else {
      // Clean up socket when user logs out
      if (socket) {
        socket.disconnect();
        setSocket(null);
      }
    }
  }, [authUser]); // Remove socket from dependency array to avoid infinite loops

  return (
    <SocketContext.Provider value={{ socket, setSocket }}>
      {children}
    </SocketContext.Provider>
  );
};
