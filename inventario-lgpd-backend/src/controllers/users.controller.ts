import express, { Request, Response } from "express";

import { BaseUser, User } from "../models/users.model";
import * as UserService from "../services/users.service";

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
    const receivedUser: BaseUser = req.body;

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
