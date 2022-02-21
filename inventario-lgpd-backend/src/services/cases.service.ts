import { v4 as uuidv4 } from "uuid";

/**
 * Data Model Interfaces
 */
import {
  FullCaseObject,
  FullCaseObjectModel,
  CaseItemObject,
  reduceCaseObject,
} from "../models/cases.model";

/**
 * Service Methods
 */
export const findAll = async (): Promise<CaseItemObject[]> => {
  let allStoredCases;
  try {
    allStoredCases = await FullCaseObjectModel.find({});
  } catch (error) {
    throw new Error("Não foi possível recuperar dados da base");
  }

  const reducedCases: CaseItemObject[] = allStoredCases
    .map((c) => c.toObject({ getters: true }))
    .map((c) => reduceCaseObject(c));

  return reducedCases;
};

export const find = async (id: string): Promise<FullCaseObject | null> => {
  let foundCase;

  try {
    foundCase = await FullCaseObjectModel.findById(id);
  } catch (error) {
    throw new Error("Não foi possível recuperar dados da base");
  }

  if (!foundCase) {
    return null;
  }

  return foundCase.toObject({ getters: true });
};

export const findByUser = async (
  userCode: string
): Promise<CaseItemObject[]> => {
  let foundCases;

  try {
    foundCases = await FullCaseObjectModel.find({
      "criador.userCode": userCode,
    });
  } catch (error) {
    throw new Error("Não foi possível recuperar dados da base");
  }

  if (!foundCases || foundCases.length === 0) {
    throw new TypeError("Nenhum caso encontrado para este usuário!");
  }

  return foundCases
    .map((c) => c.toObject({ getters: true }))
    .map((c) => reduceCaseObject(c));
};

export const create = async (
  receivedCase: FullCaseObject
): Promise<FullCaseObject> => {
  const id = uuidv4();

  const newCase = new FullCaseObjectModel({ ...receivedCase });

  try {
    await newCase.save();
  } catch (error) {
    throw new Error("Erro na conexão de banco de dados");
  }

  return newCase.toObject({ getters: true });
};

export const update = async (
  id: string,
  caseUpdate: FullCaseObject
): Promise<FullCaseObject | null> => {
  let updatedCase;

  try {
    updatedCase = await FullCaseObjectModel.findByIdAndUpdate(id, caseUpdate);
  } catch (error) {
    throw new Error("Não foi possível recuperar dados da base");
  }

  if (!updatedCase) {
    return null;
  }

  try {
    await updatedCase.save();
  } catch (error) {
    throw new Error("Erro na conexão de banco de dados");
  }

  return updatedCase.toObject({ getters: true });
};

export const remove = async (id: string): Promise<null | FullCaseObject> => {
  let caseToRemove;

  try {
    caseToRemove = await FullCaseObjectModel.findByIdAndDelete(id);
  } catch (error) {
    throw new Error("Não foi possível recuperar dados da base");
  }

  if (!caseToRemove) {
    return null;
  }

  try {
    await caseToRemove.save();
  } catch (error) {
    throw new Error("Erro na conexão de banco de dados");
  }

  return caseToRemove.toObject({ getters: true });
};
