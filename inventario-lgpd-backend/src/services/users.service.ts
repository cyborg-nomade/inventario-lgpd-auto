import { v4 as uuidv4 } from "uuid";

/**
 * Data Model Interfaces
 */
import { BaseUser, User, UserModel } from "../models/users.model";

/**
 * Service Methods
 */
export const findAll = async (): Promise<User[]> => {
  let users;
  try {
    users = await UserModel.find({}, "-password");
  } catch (error) {
    throw new Error("Não foi possível recuperar dados da base");
  }

  return users.map((user) => user.toObject({ getters: true }));
};

export const find = async (id: string): Promise<User> => {
  let foundUser;

  try {
    foundUser = await UserModel.findById(id);
  } catch (error) {
    throw new Error("Não foi possível recuperar dados da base");
  }

  if (!foundUser) {
    throw new Error("Usuário não encontrado!");
  }

  return foundUser.toObject({ getters: true });
};

export const findByUserName = async (
  username: string
): Promise<User | null> => {
  let foundUser;

  try {
    foundUser = await UserModel.findOne({
      username: username,
    });
  } catch (error) {
    throw new Error("Não foi possível recuperar dados da base");
  }

  if (!foundUser) {
    return null;
  }

  return foundUser.toObject({ getters: true });
};

export const create = async (receivedUser: BaseUser): Promise<User> => {
  const isComite = false; // TO-DO: define function for assigning comite status
  const userCode = uuidv4();

  const newUser = new UserModel({ isComite, userCode, ...receivedUser });

  try {
    await newUser.save();
  } catch (error) {
    throw new Error("Não foi possível salvar dados na base");
  }

  return newUser.toObject({ getters: true });
};

export const update = async (
  id: string,
  userUpdate: BaseUser
): Promise<User | null> => {
  let updatedUser;

  try {
    updatedUser = await UserModel.findByIdAndUpdate(id, userUpdate);
  } catch (error) {
    throw new Error("Não foi possível recuperar dados da base");
  }

  if (!updatedUser) {
    return null;
  }

  try {
    await updatedUser.save();
  } catch (error) {
    throw new Error("Erro na conexão de banco de dados");
  }

  return updatedUser.toObject({ getters: true });
};

export const remove = async (id: string): Promise<null | User> => {
  let userToRemove;

  try {
    userToRemove = await UserModel.findByIdAndDelete(id);
  } catch (error) {
    throw new Error("Não foi possível recuperar dados da base");
  }

  if (!userToRemove) {
    return null;
  }

  try {
    await userToRemove.save();
  } catch (error) {
    throw new Error("Erro na conexão de banco de dados");
  }

  return userToRemove.toObject({ getters: true });
};
