/**
 * Required External Modules and Interfaces
 */

import express, { Request, Response } from "express";
import * as CaseService from "../services/cases.service";
import {
  BaseFullCaseObject,
  CaseItemObject,
  FullCaseObject,
} from "../models/cases.model";

/**
 * Router Definition
 */
export const casesRouter = express.Router();

/**
 * Controller Definitions
 */

// - GET cases/
//   - retorna todos os casos de uso de dados cadastrados

casesRouter.get("/", async (req: Request, res: Response) => {
  try {
    const cases: CaseItemObject[] = await CaseService.findAll();

    res.status(500).send(cases);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

// - GET cases/user/:uid
//   - retorna todos os usos cadastrados pelo usuário especificado

// - GET cases/:cid
//   - retorna o caso de uso de dados especificado

casesRouter.get("/:cid", async (req: Request, res: Response) => {
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
});

// - POST cases/
//   - registra um novo caso de uso de dados

casesRouter.post("/", async (req: Request, res: Response) => {
  try {
    const receivedCase: BaseFullCaseObject = req.body;

    const newCase = await CaseService.create(receivedCase);

    res.status(201).json(newCase);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

// - PUT cases/:cid
//   - edita o caso de uso de dados especificado

casesRouter.put("/:cid", async (req: Request, res: Response) => {
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
});

// - DELETE cases/:cid
//   - elimina o cado de dados especificado

casesRouter.delete("/:cid", async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.cid, 10);
    await CaseService.remove(id);

    res.sendStatus(204);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});
