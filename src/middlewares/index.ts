import { Request, Response, NextFunction } from "express";
import multer from 'multer';
import * as path from 'path';
const UploadFilesPath = path.join(process.cwd(), 'public', 'uploads')


export class Middlewares {
  public static MiddlewareFunction(
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    console.log("middleware executed.");
    next();
  }
  UploadFile() {
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, UploadFilesPath)
      },
      filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        req.body.filename = file.fieldname + '-' + uniqueSuffix
        cb(null, req.body.filename)
      }
    })
    return multer({ storage: storage })
  }
}