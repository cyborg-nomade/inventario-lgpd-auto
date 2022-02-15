import { v4 as uuidv4 } from "uuid";

export interface BaseUser {
  username: string;
  password: string;
}

export interface User extends BaseUser {
  id: string;
  userCode: string;
  isComite: boolean;
}

export const emptyUser = (): User => ({
  id: "",
  username: "",
  password: "",
  userCode: "",
  isComite: false,
});
