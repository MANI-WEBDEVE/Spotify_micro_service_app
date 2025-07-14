import express from "express"
import dotenv from "dotenv"
import { sql } from "./config/db.js"

dotenv.config()

const app = express()
const PORT=process.env.PORT

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



initDB().then(()=>{
    app.listen(PORT, ()=> {
        console.log(`server is runing port ${PORT}`)
    })  
})