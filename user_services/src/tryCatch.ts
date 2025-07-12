import { NextFunction, Request, RequestHandler, Response } from "express";

const tryCatch = (handler: RequestHandler): RequestHandler => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try { await handler(req, res, next) }
        catch (error: any) {
            res.status(500).json({
                success: false,
                message: "Something went wrong",
                error: error?.message
            })
        }
    }
}

export default tryCatch;