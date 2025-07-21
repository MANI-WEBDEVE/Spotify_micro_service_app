import express from 'express'
import { authAdmin } from './middleware.js'
import { addAlbum } from './controller.admin.js'
import uploadFile from './config/multer.js'

const router = express.Router()

router.post('/album/new',authAdmin, uploadFile,addAlbum )

export default router