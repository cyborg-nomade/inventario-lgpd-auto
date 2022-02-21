import { Schema, Types, model, Model } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

export interface BaseUser {
  username: string;
  password: string;
}

export interface User extends BaseUser {
  userCode: string;
  isComite: boolean;
  cases: Types.ObjectId[];
}

// TMethodsAndOverrides
type UserDocumentProps = {
  cases: Types.DocumentArray<Types.ObjectId>;
};
type UserModelType = Model<User, {}, UserDocumentProps>;

export const UserSchema = new Schema<User, UserModelType>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userCode: { type: String, required: true, unique: true },
  isComite: { type: Boolean, required: true },
  cases: [{ type: Schema.Types.ObjectId, required: true, ref: "Case" }],
});

UserSchema.plugin(uniqueValidator);

export const UserModel = model<User, UserModelType>("User", UserSchema);

// export const emptyUser = (): User => ({
//   username: "",
//   password: "",
//   userCode: "",
//   isComite: false,
//   cases: "",
// });
