import { Request } from "express";
import { tryCatch } from "./config/tryCatch.js";
import getBuffer from "./config/DataUri.js";
import cloudinary from "cloudinary"
import { sql } from "./config/db.js";

interface AuthenticatedRequest extends Request {
    user?: {
        _id: string,
        role: string,
    }
}

export const addAlbum = tryCatch(async (req: AuthenticatedRequest, res) => {
    if (req.user?.role !== "admin") {
        res.status(403).json({ message: "You are not admin" })
        return
    }

    const { title, description } = req.body
    const file = req.file

    const exists = await sql`
    SELECT * FROM albums WHERE title = ${title} OR description = ${description}
    `;
    if (exists.length > 0) {
        res.status(404).json({ message: "Title and description already exists" })
        return
    }


    if (title.length <= 0 || description <= 0) {
        res.status(301).json({ message: "Please title and description provide" })
        return
    }
    if (!file) {
        res.status(400).json({ message: "Please Provide the File" })
        return
    }

    const fileBuffer = getBuffer(file)

    // console.log(`filebuffer and filebuffer content ${fileBuffer} and ${fileBuffer.content}`)
    // console.log(`file to send user `, file)

    if (!fileBuffer || !fileBuffer.content) {
        res.status(500).json({ message: "Failed to Generate File Buffer" })
        return
    }

    const cloud = await cloudinary.v2.uploader.upload(fileBuffer.content, {
        folder: "Albums"
    })

    //     const existFile = await sql`
    //   SELECT * FROM albums WHERE thumbnail = ${cloud.secure_url}
    // `;
    //     if (existFile.length > 0) {
    //         res.status(404).json({ message: "Thumbnail already exists" })
    //         return
    //     }

    // console.log(`cloud for admin service: `, cloud)

    const result = await sql`
        INSERT INTO albums (title, description, thumbnail) 
        VALUES (${title}, ${description}, ${cloud.secure_url}) 
        RETURNING *
    `
    // console.log(`result for admin service:`, result)
    res.status(200).json(
        { message: "Album Created", album: result[0] }
    )


})

export const addSongs = tryCatch(async (req: AuthenticatedRequest, res) => {
    if (req.user?.role !== "admin") {
        res.status(400).json({ message: "You are not admin" })
        return
    }

    const { title, description, album } = req.body
    const file = req.file  




    if (title.length <= 0 || description.length <= 0) {
        res.status(400).json({ message: "Please Provide the title and description minimum 5 character" })
        return
    }


    const exists = await sql`
    SELECT * FROM songs WHERE title = ${title} AND description = ${description}
    `;
    if (exists.length > 0) {
        res.status(404).json({ message: "Title and Description already exist" })
        return
    }


    if (!file) {
        res.status(400).json({ message: "Please Provide the File" })
        return
    }

    const isAlbum = await sql`
    SELECT * FROM albums WHERE id = ${album}
    `

    if (isAlbum.length == 0) {
        res.status(404).json({ message: "No Albums Found this ID" + album })
        return
    }



    const fileBuffer = getBuffer(file)

    if (!fileBuffer || !fileBuffer.content) {
        res.status(500).json({ message: "Failed to Generate File Buffer" })
        return
    }

    const cloud = await cloudinary.v2.uploader.upload(fileBuffer.content, {
        folder: "Songs",
        resource_type: "video"
    })

    // const existSong = await sql`
    // SELECT * FROM songs WHERE audio = ${cloud.secure_url}
    // `;
    // if (existSong.length > 0) {
    //     res.status(404).json({message:"Song already exist"})
    // }


    const result = await sql`
    INSERT INTO songs (title, description, audio , album_id)
    VALUES (${title}, ${description}, ${cloud.secure_url}, ${album})

    `

    res.status(200).json(
        { message: "Add Song Succes", result: result }
    )
})


export const addThumbnail = tryCatch(async (req: AuthenticatedRequest, res) => {
    if (req.user?.role !== "admin") {
        res.status(404).json(
            { message: "You are Not Admin" }
        )
        return
    }

    const song = await sql`
    SELECT * FROM songs WHERE id = ${req.params.id}
    `

    if (song.length == 0) {
        res.status(400).json(
            { message: `This id:${req.params.id} song not found` }
        )
        return
    }

    const file = req.file

    if (!file) {
        res.status(404).json({ message: "Please Provide a File" })
        return
    }

    const fileBuffer = getBuffer(file)


    if (!fileBuffer || !fileBuffer.content) {
        res.status(500).json({ message: "Somthing went wrong to generate file buffer" })
        return
    }

    const cloud = await cloudinary.v2.uploader.upload(fileBuffer.content, {
        folder: "Songs_Thumbnail"
    })

    const result = await sql`
    UPDATE songs SET thumbnail = ${cloud.secure_url} WHERE id = ${req.params.id} 
    RETURNING *
    `

    res.status(200).json(
        { message: "added thumbnail", result: result[0] }
    )

})

export const deleteAlbum = tryCatch(async (req:AuthenticatedRequest, res)=>{
    if (req.user?.role !== "admin") {
        res.status(404).json(
            { message: "You are Not Admin" }
        )
        return
    }


    const {id}=req.params
    const albumId= await sql `SELECT FROM albums WHERE id = ${id}`
    if (albumId.length === 0){
        return res.status(404).json({message: "Album Not Found"})
    }
    await sql `DELETE FROM songs WHERE album_id = ${id}`
    await sql `DELETE FROM albums WHERE id = ${id}`

    res.status(200).json({message:"Album Delete Sucessfully"})
})


export const deleteSong = tryCatch(async(req:AuthenticatedRequest, res)=>{
    if (req.user?.role !== "admin"){
        return res.status(404).json({message:"You are Not Admin"})
    }

    const {id}=req.params

    const songId= await sql `SELECT FROM songs WHERE id = ${id}`

    if (songId.length === 0){
        return res.status(400).json({message: "Song Not Found"})
    }

    await sql `DELETE FROM songs WHERE id = ${id}`

    return res.status(200).json({message: "Song delete Successfully"})


})