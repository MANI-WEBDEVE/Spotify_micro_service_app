import {neon} from "@neondatabase/serverless"
import dotenv from 'dotenv'

dotenv.config()
const sql = neon(process.env.NEON_DB_URI as string)

export default sql