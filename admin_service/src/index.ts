import express from "express"
import dotenv from "dotenv"
import { sql } from "./config/db.js"
import adminRouter from "./route.js"
import { cloudinary_setup } from "./config/cloudinary.js"

dotenv.config()

const app = express()
const PORT=process.env.PORT

app.use(express.json()) 

cloudinary_setup()

async function initDB(){
    try{
        await sql`
            CREATE TABLE IF NOT EXISTS albums(
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            description VARCHAR(300) NOT NULL,
            thumbnail VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `
        await sql`
            CREATE TABLE IF NOT EXISTS songs(
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            description VARCHAR(300) NOT NULL,
            thumbnail VARCHAR(255),
            audio VARCHAR(255) NOT NULL,
            album_id INTEGER REFERENCES albums(id) ON DELETE SET NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `
        console.log("initalize the database")
    } catch(error:any){
        console.log(error)
        console.log("error")
    }
}

app.use("/api/v1", adminRouter)

initDB().then(()=>{
    app.listen(PORT, ()=> {
        console.log(`server is runing port ${PORT}`)
    })  
})