import { Request, Response } from "express";
import { validationResult } from "express-validator";

import { BaseUser, User } from "../models/users.model";
import * as UserService from "../services/users.service";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users: User[] = await UserService.findAll();

    res.status(200).send({ users: users });
  } catch (error: any) {
    res.status(500).send({ message: error.message });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.uid;
    const reqUser: User = await UserService.find(id);

    return res.status(200).send({ user: reqUser });
  } catch (error: any) {
    res.status(500).send({ message: error.message });
  }
};

export const registerUser = async (req: Request, res: Response) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(422).send({ message: "Requisição inválida!" });
    }

    const receivedUser: BaseUser = req.body;

    const newUser = await UserService.create(receivedUser);
    res.status(201).send({ user: newUser });
  } catch (error: any) {
    res.status(500).send({ message: error.message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.uid;
    const userUpdate: BaseUser = req.body;

    const updatedUser = await UserService.update(id, userUpdate);
    return res.status(200).send({ user: updatedUser });
  } catch (error: any) {
    res.status(500).send({ message: error.message });
  }
};

export const removeUser = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.uid;

    const existingUser = await UserService.find(id);

    if (existingUser) {
      const removedUser = await UserService.remove(id);
      return res.status(200).send({ removedUser: removedUser });
    }

    res.status(404).send({ message: "Usuário não encontrado" });
  } catch (error: any) {
    res.status(500).send({ message: error.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const userToLogin: BaseUser = req.body;

    console.log(userToLogin);

    const identifiedUser = await UserService.findByUserName(
      userToLogin.username
    );

    if (!identifiedUser || identifiedUser.password !== userToLogin.password) {
      return res.status(401).send({ message: "Credenciais incorretas!" });
    }

    identifiedUser.password = "";

    res.status(200).send({ message: "Usuário logado!", user: identifiedUser });
  } catch (error: any) {
    res.status(500).send({ message: error.message });
  }
};
