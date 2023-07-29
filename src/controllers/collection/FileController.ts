import * as path from "path";
import { Request, Response } from "express";
import JSONResponse from "../../services/JSONResponse.js";
import { presql } from "../../connection/conn.js";
import { Services } from "../../services/index.js";
import { FileHandler } from "../../types/server.js"
 
 
const UploadFilesPath = path.join(process.cwd(), 'public', 'uploads')

const newURL = process.env.APP_URL
const Service = new Services();
const cache = Service.cache
class FileController {
    async UploadFileSingle(req: Request, res: Response) {
        let FilesArray: any = []
        try {
            if (!req.files || Object.keys(req.files).length === 0) {
                throw new Error("No files were uploaded.")
            }
            const filetack = req.files.filetack as FileHandler[] | FileHandler
            if (Array.isArray(filetack)) {
                filetack.forEach((file: FileHandler) => {
                    const renameFile = file.name.replace(/\s+/g, '').trim()
                    file.mv(`${path.join(UploadFilesPath, renameFile)}`, async function (err: any) {
                        if (err) throw new Error(err)
                        const id = Service.Md5Checksum(Date.now().toString())
                        const key = Service.SimpleHash()
                        const createInfo = { file: file.name, link: `${newURL}/download/file/${id}/${key}` }
                        const extenstion = file.name.split('.')[1]
                        await presql.create({
                            table: "all_files", data: {
                                id,
                                fileName: renameFile,
                                size: file.size,
                                ext: extenstion,
                                md5: key,
                                pair_key: Service.encrypt(key),
                                expiresAt: req.body.expiresAt,
                                expiredEnabled: false,
                            }
                        })
                        FilesArray.push(createInfo)
                        JSONResponse.Response(req, res, "File Uploaded SuccessFully", { DLink: FilesArray })
                    })
                })
            } else {
                const key = Service.SimpleHash()      
                const renameFile = filetack.name.replace(/\s+/g, '').trim()

                filetack.mv(`${path.join(UploadFilesPath, renameFile)}`, async function (err: any) {
                    if (err) throw new Error(err)
                    const id = Service.Md5Checksum(Date.now().toString())
                    const extenstion = filetack.name.split('.')[1]
                    await presql.create({
                        table: "all_files", data: {
                            id,
                            fileName: renameFile,
                            size: filetack.size,
                            ext: extenstion,
                            md5: key,
                            pair_key: Service.encrypt(key),
                            expiresAt: req.body.expiresAt,
                            expiredEnabled: false,
                        }
                    })
                    const link = `${newURL}/download/file/${id}/${key}`
                    JSONResponse.Response(req, res, "File Uploaded SuccessFully", { DLink: link })
                })
            }

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
            JSONResponse.Error(req, res, "Unable to Download File", { error: error.message })
        }
    }
    async FetchFileInfo(req: Request, res: Response) {
        const fileId = req.params.fileId
        const key = req.params.key  
        
        try {
            const getFile = await presql.findOne({ table: "all_files", where: { id: fileId } })
            if(getFile.length === 0) throw new Error("File Not Found")
           if(Service.decrypt(getFile[0].pair_key)!==key) throw new Error("File Key and CheckSum is mismatched or File key is manipulated")
            JSONResponse.Response(req, res, "File Details", { FileInfo: getFile[0] })
        } catch (error: any) {
            JSONResponse.Error(req, res, "Unable to Get File Details", { error: error.message })
        }
    }

}
export default new FileController()


