import { Request } from "express";
import { tryCatch } from "./config/tryCatch.js";
import getBuffer from "./config/DataUri.js";
import cloudinary from "cloudinary"
import { sql } from "./config/db.js";

interface AuthenticatedRequest extends Request {
    user?:{
        _id:string,
        role:string,
    }
}

export const addAlbum= tryCatch(async(req : AuthenticatedRequest,res)=>{
    if(req.user?.role !== "admin"){
        res.status(403).json({message:"You are not admin"})
        return
    }

    const {title, description} = req.body
    const file = req.file

    if(title.length <= 0 || description <= 0){
        res.status(301).json({message:"Please title and description provide"})
        return
    }
    if(!file){
        res.status(400).json({message:"Please Provide the File"})
        return
    }

    const fileBuffer = getBuffer(file)

    // console.log(`filebuffer and filebuffer content ${fileBuffer} and ${fileBuffer.content}`)
    // console.log(`file to send user `, file)

    if(!fileBuffer || !fileBuffer.content){
        res.status(500).json({message: "Failed to Generate File Buffer"})
        return
    }

    const cloud = await cloudinary.v2.uploader.upload(fileBuffer.content, {
        folder: "Albums"
    })

    // console.log(`cloud for admin service: `, cloud)

    const result = await sql`
        INSERT INTO albums (title, description, thumbnail) 
        VALUES (${title}, ${description}, ${cloud.secure_url}) 
        RETURNING *
    `
    // console.log(`result for admin service:`, result)
    res.status(200).json(
        {message:"Album Created", album:result[0]}
    )


})