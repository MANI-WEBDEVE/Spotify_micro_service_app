import express from 'express'
import { authAdmin } from './middleware.js'
import { addAlbum, addSongs, addThumbnail, deleteAlbum, deleteSong } from './controller.admin.js'
import uploadFile from './config/multer.js'

const router = express.Router()

router.post('/album/new',authAdmin, uploadFile,addAlbum )
router.post("/song/new", authAdmin, uploadFile, addSongs)
router.post("/song/:id", authAdmin, uploadFile, addThumbnail)
router.delete("/album/delete/:id", authAdmin, deleteAlbum)
router.delete("/song/delete/:id", authAdmin, deleteSong)

export default router