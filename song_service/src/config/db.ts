import {neon} from "@neondatabase/serverless"
import dotenv from 'dotenv'
const sql = neon(process.env.NEON_DB_URI as string)