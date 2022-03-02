import { Request, Response } from "express";

import { CaseItemObject, FullCaseObject } from "../models/cases.model";
import * as CaseService from "../services/cases.service";
import * as UserService from "../services/users.service";

export const getCases = async (req: Request, res: Response) => {
  try {
    const cases: CaseItemObject[] = await CaseService.findAll();

    res.status(200).send({ cases: cases });
  } catch (error: any) {
    res.status(error.status).send({ message: error.message });
  }
};

export const getCasesByUser = async (req: Request, res: Response) => {
  try {
    const uid: string = req.params.uid;
    const userCases: CaseItemObject[] = await CaseService.findByUser(uid);

    res.status(200).send({ cases: userCases });
  } catch (error: any) {
    res.status(error.status).send({ message: error.message });
  }
};

export const getCasesById = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.cid;
    const reqCase = await CaseService.find(id);

    return res.status(200).send({ case: reqCase });
  } catch (error: any) {
    res.status(error.status).send({ message: error.message });
  }
};

export const registerCase = async (req: Request, res: Response) => {
  try {
    const receivedCase: FullCaseObject = req.body;

    const newCase = await CaseService.create(receivedCase);
    res.status(201).send({ case: newCase });
  } catch (error: any) {
    res.status(error.status).send({ message: error.message });
  }
};

export const updateCase = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.cid;
    const caseUpdate: FullCaseObject = req.body;

    const userUpdating = await UserService.find(req.userData.userId);

    if (
      !userUpdating.isComite &&
      caseUpdate.criador.toString() !== req.userData.userId
    ) {
      return res.status(404).send({
        message: "Você não tem permissão para executar esta operação",
      });
    }

    const updatedCase = await CaseService.update(id, caseUpdate);
    return res.status(200).send({ case: updatedCase });
  } catch (error: any) {
    res.status(error.status).send({ message: error.message });
  }
};

export const removeCase = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.cid;

    const userDeleting = await UserService.find(req.userData.userId);
    const caseToDelete = await CaseService.find(id);

    if (
      !userDeleting.isComite &&
      caseToDelete.criador.toString() !== req.userData.userId
    ) {
      return res.status(404).send({
        message: "Você não tem permissão para executar esta operação",
      });
    }

    const removedCase = await CaseService.remove(id);
    return res
      .status(200)
      .send({ message: "Caso deletado com sucesso", case: removedCase });
  } catch (error: any) {
    res.status(error.status).send({ message: error.message });
  }
};
