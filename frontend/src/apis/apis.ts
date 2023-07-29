import { instance } from "./instance"

export const UploadFile = async (data:any) => {
    return await instance.post("/upload-file-single",data)
}
export const DownloadFile = async (fileid: string | number) => {
    return await instance.get(`/download-file/${fileid}`)
}
export const FetchFile = async (key:string,fileid: string | number) => {
    return await instance.get(`/fetch-file-info/${fileid}/${key}`)
}