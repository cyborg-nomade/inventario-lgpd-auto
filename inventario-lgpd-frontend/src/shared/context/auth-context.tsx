import { createContext } from "react";

export const AuthContext = createContext({
  isComite: false,
  userCode: "",
  isLoggedIn: false,
  login: (uc: string, isComite: boolean) => {},
  logout: () => {},
});
