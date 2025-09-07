import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken"
import { IUser, User } from "./model.user.js";

export interface AuthenticatedUser extends Request {
    user?: IUser | null
}

/**
 * Middleware to authenticate a user based on a JWT token provided in the request headers.
 *
 * @param req - The incoming request object, expected to have a `token` header and an optional `owner` header.
 * @param res - The response object used to send HTTP responses.
 * @param next - The next middleware function in the Express stack.
 * @returns A Promise that resolves when authentication is complete.
 *
 * @remarks
 * - If the token is missing, responds with HTTP 403 and a "Please Login" message.
 * - If the token is invalid or does not contain a valid user ID, responds with HTTP 403 and an "Invalid token" message.
 * - If the user is not found in the database, responds with HTTP 404 and a "User Not Found" message.
 * - On successful authentication, attaches the user object (excluding password) to `req.user` and calls `next()`.
 * - On unexpected errors, responds with HTTP 500 and a "Something went wrong" message.
 */
export const isAuth = async (req: AuthenticatedUser, res: Response, next: NextFunction): Promise<void> => {
    try {
        const token = req.headers.token as string
        console.log(req.headers.owner)

        if (!token) {
            res.status(403).json({
                message: "Please Login"
            })
            return
        }

        const decodedTokenVal:any = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload

        if (!decodedTokenVal && decodedTokenVal._id) {
            res.status(403).json({ message: "Invalid token" })
            return
        }

        const userId = decodedTokenVal._id

        const user = await User.findById(userId).select("-password")

        if (!user) {
            res.status(404).json({ message: "User Not Found" })
            return
        }

        req.user = user
        next()
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" })
    }
}