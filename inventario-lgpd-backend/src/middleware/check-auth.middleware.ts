import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      userData: { userId: string; username: string };
    }
  }
}

declare module "jsonwebtoken" {
  export interface UserIDJwtPayload extends jwt.JwtPayload {
    userId: string;
    username: string;
  }
}

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new Error("Falha na autenticação");
    }

    if (!process.env.SECRET) {
      process.exit(1);
    }

    const decodedToken = <jwt.UserIDJwtPayload>(
      jwt.verify(token, process.env.SECRET)
    );

    req.userData = {
      userId: decodedToken.userId,
      username: decodedToken.username,
    };
    next();
  } catch (err: any) {
    return res.status(401).send({ message: "Falha na autenticação" });
  }
};
