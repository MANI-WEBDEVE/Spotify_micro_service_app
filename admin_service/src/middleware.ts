import { Request, Response, NextFunction } from "express";
import axios from 'axios'
import dotenv from "dotenv"

interface IUser {
    _id: string
    name: string
    email: string
    password: string
    album: string[]
    role: string

}

interface AuthenticatedUser extends Request {
    user?: IUser
}

dotenv.config()

export const authAdmin = async (req: AuthenticatedUser, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.token as string

        // console.log('token',token)

        if (!token) {
            return res.status(403).json({ message: "please Login" })

        }

        const { data } = await axios.get(`${process.env.User_URL as string}/api/v1/user/me`, {
            headers: {
                token,
                owner:"Muhammad Inam"
            }
        })

        // console.log(`middleware check `, data)

        req.user = data;
        next()

    } catch (error) {
        return res.status(403).json(
            { message: "Please Login ttt" , error:error, url:process.env.User_URL }
        )
    }
}
