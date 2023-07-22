import { Request, Response } from "express";

class JSONResponse {

    static Response(req: Request, res: Response, message: string, data: any = "") {
        res.status(200).json({
            success: true,
            message: message || 'success',
            data: data,
        });

    }

    static Error(req: Request, res: Response, message: string, data: any = "") {
        res.status(500).json({
            success: 500,
            message: message || 'Internal Server Error',
            data: data,
        });

    }
}

export default JSONResponse;