import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import HttpException from "./../common/http-exception";

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
      console.log("no token received");
      throw new HttpException(401, "Falha na autenticação");
    }

    if (!process.env.SECRET) {
      console.log("no secret env variable");
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
    console.log("auth error:");

    console.log(err);

    return res.status(401).send({ message: "Falha na autenticação" });
  }
};
