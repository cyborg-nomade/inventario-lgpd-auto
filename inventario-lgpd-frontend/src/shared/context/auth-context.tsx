import { createContext } from "react";

export const AuthContext = createContext({
  isComite: false,
  userId: "",
  isLoggedIn: false,
  login: (uc: string, isComite: boolean) => {},
  logout: () => {},
});
