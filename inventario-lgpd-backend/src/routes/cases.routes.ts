/**
 * Required External Modules and Interfaces
 */
import express from "express";

import {
  getCases,
  getCasesById,
  getCasesByUser,
  registerCase,
  removeCase,
  updateCase,
} from "../controllers/cases.controller";
import { checkAuth } from "../middleware/check-auth.middleware";

/**
 * Router Definition
 */
export const casesRouter = express.Router();

/**
 * Controller Definitions
 */
casesRouter.use(checkAuth);

// - GET cases/
//   - retorna todos os casos de uso de dados cadastrados
casesRouter.get("/", getCases);

// - GET cases/user/:uid
//   - retorna todos os usos cadastrados pelo usuário especificado
casesRouter.get("/user/:uid", getCasesByUser);

// - GET cases/:cid
//   - retorna o caso de uso de dados especificado
casesRouter.get("/:cid", getCasesById);

// - POST cases/
//   - registra um novo caso de uso de dados
casesRouter.post("/", registerCase);

// - PUT cases/:cid
//   - edita o caso de uso de dados especificado
casesRouter.put("/:cid", updateCase);

// - DELETE cases/:cid
//   - elimina o cado de dados especificado
casesRouter.delete("/:cid", removeCase);
