import express from 'express'
import path from "path";
import JSONResponse from '../services/JSONResponse.js'
import { FileController } from "../controllers/index.js";
import { Middlewares } from '../middlewares/index.js'
import fileUpload, { UploadedFile } from 'express-fileupload';
import { FileHandler } from '../types/server.js';
const UploadFilesPath = path.join(process.cwd(), 'public', 'uploads')

const middlewares = new Middlewares()
export class Routes {
    public router: express.Router;
    constructor() {
        this.router = express.Router();
        this.PublicRoutes();
        this.PrivateRoutes();
        this.ProtecteRoutes();
    }

    private PublicRoutes(): void {
        this.router.get("/", (req, res) => JSONResponse.Response(req, res, "API is OKay", { Working: true }))
        this.router.get("/all-file", FileController.default.FileList)

        this.router.post("/upload-file-single",fileUpload(), FileController.default.UploadFileSingle);
        this.router.get("/download-file/:fileId", FileController.default.DownloadFile)
        this.router.use("*", (req, res) => JSONResponse.Response(req, res, "API is Running", { error: "Not Found", code: 404, message: "Unhandled Route" }))
    }
    private PrivateRoutes() { }
    private ProtecteRoutes() { }
}
