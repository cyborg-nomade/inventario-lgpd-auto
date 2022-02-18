import { Schema, Types, model } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

export interface BaseUser {
  username: string;
  password: string;
}

export interface User extends BaseUser {
  userCode: string;
  isComite: boolean;
  cases: string;
}

export const UserSchema = new Schema<User>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userCode: { type: String, required: true, unique: true },
  isComite: { type: Boolean, required: true },
  cases: { type: String, required: true },
});

UserSchema.plugin(uniqueValidator);

export const UserModel = model<User>("User", UserSchema);

export const emptyUser = (): User => ({
  username: "",
  password: "",
  userCode: "",
  isComite: false,
  cases: "",
});
