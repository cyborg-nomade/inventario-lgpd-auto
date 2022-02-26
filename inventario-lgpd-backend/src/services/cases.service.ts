import { v4 as uuidv4 } from "uuid";
import mongoose from "mongoose";

/**
 * Data Model Interfaces
 */
import {
  FullCaseObject,
  FullCaseObjectModel,
  CaseItemObject,
  reduceCaseObject,
} from "../models/cases.model";
import { UserModel } from "../models/users.model";
import HttpException from "./../common/http-exception";

/**
 * Service Methods
 */
export const findAll = async (): Promise<CaseItemObject[]> => {
  let allStoredCases;

  try {
    allStoredCases = await FullCaseObjectModel.find({});
  } catch (error) {
    throw new HttpException(500, "Não foi possível recuperar dados da base");
  }

  if (!allStoredCases || allStoredCases.length === 0) {
    throw new HttpException(404, "Nenhum caso encontrado na base de dados!");
  }

  return allStoredCases
    .map((c) => c.toObject({ getters: true }))
    .map((c) => ({ ...reduceCaseObject(c), id: c.id }));
};

export const findByUser = async (uid: string): Promise<CaseItemObject[]> => {
  let foundCases;

  if (!mongoose.isValidObjectId(uid)) {
    throw new HttpException(
      400,
      "Id de usuário fornecida é inválida para a busca"
    );
  }

  try {
    foundCases = await FullCaseObjectModel.find({
      criador: uid,
    });
  } catch (error) {
    throw new HttpException(500, "Não foi possível recuperar dados da base");
  }

  if (!foundCases || foundCases.length === 0) {
    throw new HttpException(404, "Nenhum caso encontrado para este usuário!");
  }

  return foundCases
    .map((c) => c.toObject({ getters: true }))
    .map((c) => {
      return { ...reduceCaseObject(c), id: c.id };
    });
};

export const find = async (id: string): Promise<FullCaseObject> => {
  let foundCase;

  if (!mongoose.isValidObjectId(id)) {
    throw new HttpException(400, "Id fornecida é inválida para a busca");
  }

  try {
    foundCase = await FullCaseObjectModel.findById(id);
  } catch (error) {
    throw new HttpException(500, "Não foi possível recuperar dados da base");
  }

  if (!foundCase) {
    throw new HttpException(404, "Caso de Uso não encontrado!");
  }

  return foundCase.toObject({ getters: true });
};

export const create = async (
  receivedCase: FullCaseObject
): Promise<FullCaseObject> => {
  const newCase = new FullCaseObjectModel({ ...receivedCase });

  let newCaseUser;

  if (!mongoose.isValidObjectId(newCase.criador)) {
    throw new HttpException(400, "Id de usuário referido inválida!");
  }

  try {
    newCaseUser = await UserModel.findById(newCase.criador);
  } catch (error) {
    throw new HttpException(500, "Erro na conexão de banco de dados");
  }

  if (!newCaseUser) {
    throw new HttpException(
      400,
      "Não foi encontrado um usuário com o id fornecido!"
    );
  }

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await newCase.save({ session: session });
    newCaseUser.cases.push(newCase._id);
    await newCaseUser.save({ session: session, validateBeforeSave: false }); // workaround because mongoose-unique-validator creates error
    await session.commitTransaction();
  } catch (error) {
    throw new HttpException(500, "Erro na conexão de banco de dados");
  }

  return newCase.toObject({ getters: true });
};

export const update = async (
  id: string,
  caseUpdate: FullCaseObject
): Promise<FullCaseObject | null> => {
  let updatedCase;

  if (!mongoose.isValidObjectId(id)) {
    throw new HttpException(400, "Id fornecida é inválida para a busca");
  }

  try {
    updatedCase = await FullCaseObjectModel.findById(id);
  } catch (error) {
    throw new HttpException(500, "Não foi possível recuperar dados da base");
  }

  if (!updatedCase) {
    throw new HttpException(
      400,
      "Não foi encontrado um caso de uso com o id fornecido!"
    );
  }

  try {
    await updatedCase.updateOne(caseUpdate);
  } catch (error) {
    console.log(error);

    throw new HttpException(500, "Não foi possível recuperar dados da base");
  }

  try {
    updatedCase = await FullCaseObjectModel.findById(id);
  } catch (error) {
    throw new HttpException(500, "Não foi possível recuperar dados da base");
  }

  if (!updatedCase) {
    throw new HttpException(
      400,
      "Não foi encontrado um caso de uso com o id fornecido!"
    );
  }

  return updatedCase.toObject({ getters: true });
};

export const remove = async (id: string): Promise<FullCaseObject> => {
  let caseToRemove;
  let caseToRemoveUser;

  if (!mongoose.isValidObjectId(id)) {
    throw new HttpException(400, "Id fornecida é inválida para a busca");
  }

  try {
    caseToRemove = await FullCaseObjectModel.findById(id);
  } catch (error) {
    throw new HttpException(500, "Não foi possível recuperar dados da base");
  }

  if (!caseToRemove) {
    throw new HttpException(404, "Caso de uso não encontrado");
  }

  try {
    caseToRemoveUser = await UserModel.findById(caseToRemove.criador);
  } catch (error) {
    throw new HttpException(500, "Erro na conexão de banco de dados");
  }

  if (!caseToRemoveUser) {
    throw new HttpException(
      400,
      "Não foi encontrado um usuário com o id fornecido!"
    );
  }

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await caseToRemove.remove({ session: session });
    caseToRemoveUser.cases.pull(caseToRemove._id);
    await caseToRemoveUser.save({
      session: session,
      validateBeforeSave: false,
    });
    await session.commitTransaction();
  } catch (error) {
    console.log(error);

    throw new HttpException(500, "Erro na conexão de banco de dados");
  }

  return caseToRemove.toObject({ getters: true });
};
