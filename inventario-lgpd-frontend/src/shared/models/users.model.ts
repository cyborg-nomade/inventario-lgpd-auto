export interface BaseUser {
  username: string;
  password: string;
  isComite: boolean;
}

export interface User extends BaseUser {
  userCode: string;
}

export const emptyUser = (): User => ({
  username: "",
  password: "",
  userCode: "",
  isComite: false,
});
