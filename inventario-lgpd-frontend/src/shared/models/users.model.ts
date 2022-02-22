export interface BaseUser {
  username: string;
  password: string;
}

export interface User extends BaseUser {
  userCode: string;
  isComite: boolean;
  id: string;
}

export const emptyUser = (): User => ({
  username: "",
  password: "",
  userCode: "",
  isComite: false,
  id: "",
});
