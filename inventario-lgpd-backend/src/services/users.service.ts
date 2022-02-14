import { v4 as uuidv4 } from "uuid";

/**
 * Data Model Interfaces
 */
import { BaseUser, User } from "../models/users.model";

/**
 * In-Memory Store
 */
let users: User[] = [
  {
    id: "u1",
    username: "User1",
    userCode: "1",
    password: "Anarchy!19",
    isComite: false,
  },
  {
    id: "u2",
    username: "User2",
    userCode: "2",
    password: "Anarchy!19",
    isComite: false,
  },
  {
    id: "c100",
    username: "Comite",
    userCode: "100",
    password: "Anarchy!19",
    isComite: true,
  },
];

/**
 * Service Methods
 */
export const findAll = async (): Promise<User[]> => users;

export const find = async (id: string): Promise<User> => {
  const foundUser = users.find((u) => u.id === id);

  if (foundUser === undefined) {
    throw new TypeError("Caso não encontrado!");
  }

  return foundUser;
};

export const create = async (recUser: BaseUser): Promise<User> => {
  const id = uuidv4();

  const newUser = { id, ...recUser };

  users.push(newUser);

  return newUser;
};

export const update = async (
  id: string,
  userUpdate: BaseUser
): Promise<User | null> => {
  let storedUser = { ...(await find(id)) };
  const storedUserIndex = users.findIndex((c) => c.id === id);

  if (!storedUser) {
    return null;
  }

  storedUser = { ...userUpdate, id };
  console.log(storedUser);

  users[storedUserIndex] = storedUser;

  return users[storedUserIndex];
};

export const remove = async (id: string): Promise<null | void> => {
  users = users.filter((u) => u.id === id);
};
