import { Request, Response, NextFunction } from "express";
 
export class Middlewares {
  public static MiddlewareFunction(
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    // try {      
      
    //   const headers = req.headers;       
    //   const apiKey = headers["X-Request-ID"] || undefined;      
    //   if (typeof apiKey === "undefined") {
    //      res.status(404).json({
    //       return: false,
    //       status_code: 404,
    //       message: "API_KEY is Required",
    //     });
    //   }
    //   if (apiKey !== process.env.API_KEY) {
    //        res.status(401).json({
    //       return: false,
    //       status_code: 412,
    //       message: "Invalid KEY, Check API KEY",
    //     });
    //   }
    //   next();
    // } catch (error: any) {
    //   res.send({
    //     success: false,
    //     message: error.message,
    //   });
    //   res.end();
    // }
   next();
  }

 

}