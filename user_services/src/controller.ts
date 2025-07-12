import { User } from "./model.user.js";
import tryCatch from "./tryCatch.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const registerUser = tryCatch(async (req, res, next) => {
     const { name, email, password } = req.body

     const userExist = await User.findOne({ email })

     if (userExist) {
          res.send(
               "user already exist"
          ).status(401)

          return
     }

     const hashPassword =await bcrypt.hash(password, 10)

     const user =await User.create(
          {
               name,
               email,
               password: hashPassword,
          }
     )

     const token = jwt.sign({ _id: (await user)._id }, process.env.JWT_SECRET as string, {
          expiresIn: "7d"
     })

     res.status(201).json({
          message: "User Resgister",
          user,
          token
     })
})