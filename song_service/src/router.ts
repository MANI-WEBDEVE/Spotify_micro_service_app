import express from 'express'
import { allAlbums, allSongs, getOneSong, getSongByAlbumId } from './controller.js'

const router = express.Router()

router.get("/albums/all", allAlbums)
router.get("/songs/all", allSongs)
router.get("/album/:id", getSongByAlbumId)
router.get("/song/:id", getOneSong)

export default router