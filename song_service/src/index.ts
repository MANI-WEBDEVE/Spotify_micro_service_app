import express from 'express'
import songRouter from "./router.js"
import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.use('/api/v1', songRouter)

const PORT = process.env.PORT as string

app.listen(PORT,()=>{console.log("server is run ", PORT)})