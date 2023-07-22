import { Request, Response, NextFunction } from "express";
import { FileHandler } from "../types/server.js";


export class Middlewares {
  public static MiddlewareFunction(
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    console.log("middleware executed.");
    next();
  }

 

}