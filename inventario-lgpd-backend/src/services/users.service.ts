import mongoose, { Types } from "mongoose";
import bcrypt from "bcryptjs";

import HttpException from "./../common/http-exception";

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
    console.log(error);
    throw new HttpException(500, "Não foi possível recuperar dados da base");
  }

  return users.map((user) => user.toObject({ getters: true }));
};

export const find = async (id: string): Promise<User> => {
  let foundUser;

  if (!mongoose.isValidObjectId(id)) {
    throw new HttpException(400, "Id fornecida é inválida para a busca");
  }

  try {
    foundUser = await UserModel.findById(id);
  } catch (error) {
    console.log(error);
    throw new HttpException(500, "Não foi possível recuperar dados da base");
  }

  if (!foundUser) {
    throw new HttpException(404, "Usuário não encontrado!");
  }

  return foundUser.toObject({ getters: true });
};

export const findByUserName = async (
  username: string
): Promise<{ user: User; id: string }> => {
  let foundUser;

  try {
    foundUser = await UserModel.findOne({
      username: username,
    });
  } catch (error) {
    console.log(error);
    throw new HttpException(500, "Não foi possível recuperar dados da base");
  }

  if (!foundUser) {
    throw new HttpException(404, "Usuário não encontrado!");
  }

  return { user: foundUser.toObject({ getters: true }), id: foundUser.id };
};

export const create = async (receivedUser: BaseUser): Promise<User> => {
  const isComite = receivedUser.username.includes("comite"); // TO-DO: define function for assigning comite status
  const cases: Types.ObjectId[] = [];

  let hasUser;

  try {
    hasUser = await UserModel.findOne({
      username: receivedUser.username,
    });
  } catch (error) {
    console.log(error);
    throw new HttpException(500, "Não foi possível recuperar dados da base");
  }

  if (hasUser) {
    throw new HttpException(400, "Já existe um usuário com este nome!");
  }

  let hashedPassword;

  try {
    hashedPassword = await bcrypt.hash(receivedUser.password, 12);
  } catch (error) {
    console.log(error);
    throw new HttpException(500, "Não foi possível criar o usuário");
  }

  const newUser = new UserModel({
    ...receivedUser,
    isComite,
    cases,
    password: hashedPassword,
  });

  try {
    await newUser.save();
  } catch (error) {
    console.log(error);
    throw new HttpException(500, "Não foi possível salvar dados na base");
  }

  return newUser.toObject({ getters: true });
};

export const update = async (
  id: string,
  userUpdate: BaseUser
): Promise<User | null> => {
  let updatedUser;

  try {
    updatedUser = await UserModel.findById(id);
  } catch (error) {
    console.log(error);
    throw new HttpException(500, "Não foi possível recuperar dados da base");
  }

  if (!updatedUser) {
    throw new HttpException(
      400,
      "Não foi encontrado um usuário com o id fornecido!"
    );
  }

  try {
    await updatedUser.updateOne(userUpdate);
  } catch (error) {
    console.log(error);
    throw new HttpException(500, "Não foi possível recuperar dados da base");
  }

  try {
    updatedUser = await UserModel.findById(id);
  } catch (error) {
    console.log(error);
    throw new HttpException(500, "Não foi possível recuperar dados da base");
  }

  if (!updatedUser) {
    throw new HttpException(
      404,
      "Não foi encontrado um usuário com o id fornecido!"
    );
  }

  return updatedUser.toObject({ getters: true });
};

export const remove = async (id: string): Promise<null | User> => {
  let userToRemove;

  try {
    userToRemove = await UserModel.findById(id);
  } catch (error) {
    console.log(error);
    throw new HttpException(500, "Não foi possível recuperar dados da base");
  }

  if (!userToRemove) {
    return null;
  }

  try {
    await userToRemove.remove();
  } catch (error) {
    console.log(error);
    throw new HttpException(500, "Erro na conexão de banco de dados");
  }

  return userToRemove.toObject({ getters: true });
};
