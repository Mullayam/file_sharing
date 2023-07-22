import * as path from "path";
import { Request, Response } from "express";
import JSONResponse from "../../services/JSONResponse.js";
import { presql } from "../../connection/conn.js";
import { Services } from "../../services/index.js";
import { FileHandler } from "../../types/server.js"
const UploadFilesPath = path.join(process.cwd(), 'public', 'uploads')


const cache = new Services().cache;
class FileController {
    async UploadFileSingle(req: Request, res: Response) {

        try {

            if (!req.files || Object.keys(req.files).length === 0) {
                throw new Error("No files were uploaded.")
            }
            const filetack = req.files.filetack as FileHandler[]
            filetack.forEach((file: FileHandler) => {
                file.mv(`${path.join(UploadFilesPath, file.name)}`, async function (err: any) {
                    if (err) throw new Error(err)
                    const extenstion = file.name.split('.')[1]
                    let createNewfile = await presql.create({
                        table: "all_files", data: {
                            id: Date.now(),
                            fileName: file.name,
                            size: file.size,
                            ext: extenstion,
                            expiresAt: req.body.expiresAt,
                            expiredEnabled: false,

                        }
                    })
                    JSONResponse.Response(req, res, "File Uploaded SuccessFully", { createNewfile })
                })
            })


        } catch (error: any) {
            JSONResponse.Error(req, res, "Unable to Upload File", { error: error.message })

        }
    }

    async DownloadFile(req: Request, res: Response) {
        let isCached = false;
        let getFile;
        const fileId = req.params.fileId

        try {
            const cacheResults = await cache.get(fileId)
            if (cacheResults) {
                isCached = true;
                getFile = JSON.parse(cacheResults);
            } else {
                getFile = await presql.findOne({ table: "all_files", where: { id: fileId }, select: { id: 1, fileName: 1, ext: 1, expiresAt: 1, expiredEnabled: 1 } })
                cache.set(fileId, JSON.stringify(getFile), {
                    EX: 180,
                    NX: true,
                })
            }
            const FileNAme = getFile[0].file_name
            const DownloadPath = path.join(process.cwd(), "public", "uploads", FileNAme);
            res.download(DownloadPath, (error: any) => { if (error) throw new Error(error); });
            JSONResponse.Response(req, res, "DownloadFile", { File: getFile, isCached })
        } catch (error: any) {
            JSONResponse.Response(req, res, "Unable to Download File", { error: error.message })
        }
    }
    async FileList(req: Request, res: Response) {

        let isCached = false;
        let FileList;

        try {
            const cacheResults = await cache.get("files")
            if (cacheResults) {
                isCached = true;
                FileList = JSON.parse(cacheResults);
            } else {
                FileList = await presql.findMany({ table: "all_files" })
                cache.set("files", JSON.stringify(FileList), {
                    EX: 180,
                    NX: true,
                })
            }
            JSONResponse.Response(req, res, "DownloadFile", { File: FileList, isCached })

        } catch (error: any) {
            JSONResponse.Response(req, res, "Unable to Download File", { error: error.message })
        }
    }

}
export default new FileController()


