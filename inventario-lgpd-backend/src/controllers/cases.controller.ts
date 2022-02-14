import express, { Request, Response } from "express";

import {
  BaseFullCaseObject,
  CaseItemObject,
  FullCaseObject,
} from "../models/cases.model";
import * as CaseService from "../services/cases.service";

export const getCases = async (req: Request, res: Response) => {
  try {
    const cases: CaseItemObject[] = await CaseService.findAll();

    res.status(200).send(cases);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const getCasesByUser = async (req: Request, res: Response) => {
  try {
    const uid: string = req.params.uid;
    const userCases: CaseItemObject[] = await CaseService.findByUser(uid);

    res.status(200).send(userCases);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const getCasesById = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.cid, 10);

  try {
    const reqCase: FullCaseObject = await CaseService.find(id);

    if (reqCase) {
      return res.status(200).send(reqCase);
    }

    res.status(404).send("Caso de Uso não encontrado");
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const registerCase = async (req: Request, res: Response) => {
  try {
    const receivedCase: BaseFullCaseObject = req.body;

    const newCase = await CaseService.create(receivedCase);

    res.status(201).json(newCase);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const updateCase = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.cid, 10);

  try {
    const caseUpdate: FullCaseObject = req.body;

    const existingCase: FullCaseObject = await CaseService.find(id);

    if (existingCase) {
      const updatedCase = await CaseService.update(id, caseUpdate);
      return res.status(200).json(updatedCase);
    }

    const newItem = await CaseService.create(caseUpdate);

    res.status(201).json(newItem);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const removeCase = async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.cid, 10);
    await CaseService.remove(id);

    res.sendStatus(204);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};
