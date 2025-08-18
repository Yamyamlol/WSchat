import React, { useState, type ReactNode } from "react";
import Cookies from "js-cookie";
import { AuthContext } from "./AuthContext";

interface UserInterface {
  _id: string;
  name: string;
  email: string;
}

interface TokenInterface {
  message: string;
  user: UserInterface;
}

type AuthProviderProps = {
  children: ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const initialUserState = Cookies.get("jwt") || localStorage.getItem("token");

  let parsedUser: TokenInterface | null = null;
  if (initialUserState) {
    try {
      parsedUser = JSON.parse(initialUserState) as TokenInterface;
    } catch {
      parsedUser = null;
    }
  }

  const [authUser, setAuthUser] = useState<TokenInterface | null>(parsedUser);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
