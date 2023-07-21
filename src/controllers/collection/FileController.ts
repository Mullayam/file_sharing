import { Request, Response } from "express";
import JSONResponse from "../../services/JSONResponse.js";

class FileController {

    UploadFile(req: Request, res: Response) {
        console.log("UploadFile")
        JSONResponse.Response(req, res, "UploadFile", {})
    }
    DownloadFile(req: Request, res: Response) {
        console.log("DownloadFile")
        JSONResponse.Response(req, res, "DownloadFile", {})
    }
    FileList(req: Request, res: Response) {
        console.log("FileList")
        JSONResponse.Response(req, res, "FileList", {})
    }

}
export default new FileController()