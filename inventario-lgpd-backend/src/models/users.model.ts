import { v4 as uuidv4 } from "uuid";
import { Schema, Types, model } from "mongoose";

export interface BaseUser {
  username: string;
  password: string;
}

export interface User extends BaseUser {
  userCode: string;
  isComite: boolean;
}

export const UserSchema = new Schema<User>({
  username: String,
  password: String,
  userCode: String,
  isComite: String,
});

export const UserModel = model<User>("User", UserSchema);

export const emptyUser = (): User => ({
  username: "",
  password: "",
  userCode: "",
  isComite: false,
});
