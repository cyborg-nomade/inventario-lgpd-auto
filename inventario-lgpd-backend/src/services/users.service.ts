import { v4 as uuidv4 } from "uuid";

/**
 * Data Model Interfaces
 */
import { BaseUser, User, UserModel } from "../models/users.model";

/**
 * In-Memory Store
 */
let users: User[] = [
  {
    username: "User1",
    userCode: "1",
    password: "Anarchy!19",
    isComite: false,
  },
  {
    username: "User2",
    userCode: "2",
    password: "Anarchy!19",
    isComite: false,
  },
  {
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
  let foundUser;

  try {
    foundUser = await UserModel.findById(id);
  } catch (error) {
    throw new Error("Não foi possível recuperar dados da base");
  }

  if (!foundUser) {
    throw new TypeError("Usuário não encontrado!");
  }

  return foundUser.toObject({ getters: true });
};

export const findByUserName = async (
  username: string
): Promise<User | undefined> => {
  let foundUsers;

  try {
    foundUsers = await UserModel.findOne({
      username: username,
    });
  } catch (error) {
    throw new Error("Não foi possível recuperar dados da base");
  }

  if (!foundUsers) {
    throw new TypeError("Nenhum usuário com este nome foi encontrado!");
  }

  return foundUsers.toObject({ getters: true });
};

export const create = async (recUser: BaseUser): Promise<User> => {
  const isComite = false;
  const userCode = uuidv4();

  const newUser = new UserModel({ isComite, userCode, ...recUser });

  try {
    await newUser.save();
  } catch (error) {
    throw new Error("Erro na conexão de banco de dados");
  }

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

  storedUser = { ...storedUser, ...userUpdate };

  users[storedUserIndex] = storedUser;

  return users[storedUserIndex];
};

export const remove = async (id: string): Promise<null | void> => {
  users = users.filter((u) => u.id === id);
};
