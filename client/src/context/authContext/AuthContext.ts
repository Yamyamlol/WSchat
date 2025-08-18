import { createContext } from "react";

interface UserInterface {
  _id: string;
  name: string;
  email: string;
}

interface TokenInterface {
  message: string;
  user: UserInterface;
}

export type AuthContextType = {
  authUser: TokenInterface | null;
  setAuthUser: React.Dispatch<React.SetStateAction<TokenInterface | null>>;
};

export const AuthContext = createContext<AuthContextType | null>(null);
