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
import { check } from "express-validator";
import { checkAuth } from "../middleware/check-auth.middleware";

/**
 * Router Definition
 */
export const usersRouter = express.Router();

/**
 * Controller Definitions
 */

// - POST users/login
//    - faz login do usuário
usersRouter.post("/login", loginUser);

// - POST users/
//   - registra um novo usuário
usersRouter.post(
  "/",
  [check("username").not().isEmpty(), check("password").isLength({ min: 8 })],
  registerUser
);

usersRouter.use(checkAuth);

// - GET users/
//   - retorna todos os usuários cadastrados
usersRouter.get("/", getUsers);

// - GET users/:uid
//   - retorna o usuário especificado
usersRouter.get("/:uid", getUserById);

// - PUT users/:uid
//   - edita o usuário especificado
usersRouter.put("/:uid", updateUser);

// - DELETE users/:uid
//   - elimina o usuário especificado
usersRouter.delete("/:uid", removeUser);
