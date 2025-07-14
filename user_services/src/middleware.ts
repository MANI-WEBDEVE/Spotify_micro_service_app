import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken"
import { IUser, User } from "./model.user.js";

export interface AuthenticatedUser extends Request {
    user?: IUser | null
}

export const isAuth = async (req: AuthenticatedUser, res: Response, next: NextFunction): Promise<void> => {
    try {
        const token = req.headers.token as string

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