import express from 'express'
import { authAdmin } from './middleware.js'
import { addAlbum, addSongs, addThumbnail } from './controller.admin.js'
import uploadFile from './config/multer.js'

const router = express.Router()

router.post('/album/new',authAdmin, uploadFile,addAlbum )
router.post("/song/new", authAdmin, uploadFile, addSongs)
router.post("/song/:id", authAdmin, uploadFile, addThumbnail)

export default router