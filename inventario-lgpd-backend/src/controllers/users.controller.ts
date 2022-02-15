import express, { Request, Response } from "express";

import { BaseUser, User } from "../models/users.model";
import * as UserService from "../services/users.service";
import { validationResult } from "express-validator";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users: User[] = await UserService.findAll();

    res.status(200).send(users);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const id: string = req.params.uid;

  try {
    const reqUser: User = await UserService.find(id);

    if (reqUser) {
      return res.status(200).send(reqUser);
    }

    res.status(404).send("Usuário não encontrado");
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const registerUser = async (req: Request, res: Response) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(422).send("Requisição inválida!");
    }

    const receivedUser: BaseUser = req.body;

    const hasUser = await UserService.findByUserName(receivedUser.username);

    if (hasUser) {
      return res.status(422).send("Já existe um usuário com este nome!");
    }

    const newUser = await UserService.create(receivedUser);

    res.status(201).json(newUser);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const id: string = req.params.uid;

  try {
    const userUpdate: User = req.body;

    const existingUser: User = await UserService.find(id);

    if (existingUser) {
      const updatedUser = await UserService.update(id, userUpdate);
      return res.status(200).json(updatedUser);
    }

    const newUser = await UserService.create(userUpdate);

    res.status(201).json(newUser);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const removeUser = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.uid;
    await UserService.remove(id);

    res.status(200).send("Usuário removido com sucesso");
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const userToLogin: BaseUser = req.body;

    const identifiedUser = await UserService.findByUserName(
      userToLogin.username
    );

    if (!identifiedUser || identifiedUser.password !== userToLogin.password) {
      res.status(401).send("Credenciais incorretas!");
    }

    res.status(200).send("Usuário logado!");
  } catch (error) {}
};
