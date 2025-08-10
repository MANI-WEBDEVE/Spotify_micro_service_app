import { RequestHandler, Response, Request, NextFunction } from "express"


export const tryCatch = (handler: RequestHandler): RequestHandler => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await handler(req, res, next)
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: "Something Went Wrong",
                error: error?.message,
                full_error: error
            })
        }
    }
}