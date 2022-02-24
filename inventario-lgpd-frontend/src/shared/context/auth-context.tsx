import { createContext } from "react";

export const AuthContext = createContext({
  isComite: false,
  userId: "",
  isLoggedIn: false,
  token: "",
  login: (uid: string, isComite: boolean, token: string) => {},
  logout: () => {},
});
