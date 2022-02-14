/**
 * Required External Modules and Interfaces
 */

import express from "express";
import {
  getUsers,
  getUserById,
  updateUser,
  removeUser,
  registerUser,
} from "../controllers/users.controller";

/**
 * Router Definition
 */
export const usersRouter = express.Router();

/**
 * Controller Definitions
 */

// - GET users/
//   - retorna todos os usuários cadastrados

usersRouter.get("/", getUsers);

// - GET users/:uid
//   - retorna o usuário especificado

usersRouter.get("/:uid", getUserById);

// - POST users/
//   - registra um novo usuário

usersRouter.post("/", registerUser);

// - PUT users/:uid
//   - edita o usuário especificado

usersRouter.put("/:uid", updateUser);

// - DELETE users/:uid
//   - elimina o usuário especificado

usersRouter.delete("/:uid", removeUser);
