import cloudinary from "cloudinary"
import dotenv from "dotenv"

dotenv.config()

export const cloudinary_setup=()=>{
    cloudinary.v2.config(
        {
            cloud_name:process.env.Cloudinary_name,
            api_key:process.env.Cloudinary_key,
            api_secret:process.env.Cloudinary_secret
        }
    )
}