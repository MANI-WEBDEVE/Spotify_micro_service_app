import { AuthenticatedUser } from "./middleware.js";
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

     const token = jwt.sign({ _id: (user)._id }, process.env.JWT_SECRET as string, {
          expiresIn: "7d"
     })

     res.status(201).json({
          message: "User Resgister",
          user,
          token
     })
})

export const loginUser = tryCatch(async (req, res, next)=>{
     const {email, password} = req.body

     const user = await User.findOne({email})

     if(!user){
          res.status(404).json({
               message: "User is not exists",
          })
          return
     }

     const checkPass=await bcrypt.compare(password, user.password)

     if(!checkPass){
          res.status(400).json({
               message: "Invalid Password",
          })
          return
     }

     const token = jwt.sign({_id: (user)._id}, process.env.JWT_SECRET as string, {
          expiresIn: "7d"
     })
     res.status(200).json({
          message: "Logged In User",
          user,
          token
     })

})

export const myProfile=tryCatch(async(req:AuthenticatedUser, res)=>{
     const user = req.user

     res.json(user)
})