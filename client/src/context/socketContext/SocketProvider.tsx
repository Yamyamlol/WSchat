import React, { useEffect, useState, type ReactNode, useCallback } from "react";
import io from "socket.io-client";
import { useAuth } from "../authContext/useAuth";
import { SocketContext, type User } from "./SocketContext";

type Socket = ReturnType<typeof io>;

interface SocketProviderProps {
  children: ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<User[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const { authUser } = useAuth();

  // Cleanup function to properly disconnect socket
  const cleanupSocket = useCallback((socketToClose: Socket) => {
    console.log("Cleaning up socket connection");
    socketToClose.removeAllListeners();
    socketToClose.close();
  }, []);

  useEffect(() => {
    if (authUser?.user?._id) {
      console.log("Connecting socket for user:", authUser.user._id);

      const newSocket = io("http://localhost:5002", {
        query: { userId: authUser.user._id },
        transports: ["websocket"],
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      });

      // Connection event handlers
      newSocket.on("connect", () => {
        console.log("Socket connected:", newSocket.id);
        setIsConnected(true);
      });

      newSocket.on("disconnect", (reason) => {
        console.log("Socket disconnected:", reason);
        setIsConnected(false);
      });

      // Connection error handler
      newSocket.on("connect_error", (error) => {
        console.error("Socket connection error:", error);
        setIsConnected(false);
      });

      // Online users handler with better error handling
      newSocket.on("getonline", (users: User[]) => {
        console.log("Online users updated:", users);
        if (Array.isArray(users)) {
          setOnlineUsers(users);
        } else {
          console.warn("Received invalid users data:", users);
          setOnlineUsers([]);
        }
      });

      setSocket(newSocket);

      // Cleanup on unmount or auth change
      return () => {
        cleanupSocket(newSocket);
        setSocket(null);
        setIsConnected(false);
        setOnlineUsers([]);
      };
    } else {
      // If no authenticated user, clean up existing socket
      if (socket) {
        cleanupSocket(socket);
        setSocket(null);
        setIsConnected(false);
        setOnlineUsers([]);
      }
    }
  }, [authUser?.user?._id, cleanupSocket]);

  // REMOVE THIS EFFECT - it's redundant and can cause issues
  // useEffect(() => {
  //   return () => {
  //     if (socket) {
  //       cleanupSocket(socket);
  //     }
  //   };
  // }, [socket, cleanupSocket]);

  const contextValue = {
    socket,
    setSocket,
    onlineUsers,
    isConnected,
  };

  return (
    <SocketContext.Provider value={contextValue}>
      {children}
    </SocketContext.Provider>
  );
};
