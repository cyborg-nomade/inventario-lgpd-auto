import { v4 as uuidv4 } from "uuid";

export interface BaseUser {
  username: string;
  password: string;
  userCode: string;
  isComite: boolean;
}

export interface User extends BaseUser {
  id: string;
}

export const emptyUser = (): User => ({
  id: "",
  username: "",
  password: "",
  userCode: "",
  isComite: false,
});
