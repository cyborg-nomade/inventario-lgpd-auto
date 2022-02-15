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
  loginUser,
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

// - POST users/
//   - registra um novo usuário

usersRouter.post("/", registerUser);

// - POST users/login
//    - faz login do usuário

usersRouter.post("/login", loginUser);

// - GET users/:uid
//   - retorna o usuário especificado

usersRouter.get("/:uid", getUserById);

// - PUT users/:uid
//   - edita o usuário especificado

usersRouter.put("/:uid", updateUser);

// - DELETE users/:uid
//   - elimina o usuário especificado

usersRouter.delete("/:uid", removeUser);
