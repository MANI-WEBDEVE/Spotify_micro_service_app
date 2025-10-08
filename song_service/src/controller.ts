import sql from "./config/db.js";
import { tryCatch } from "./config/tryCatch.js";
import { redis_db } from "./index.js";
export const allAlbums = tryCatch(async (req, res) => {
  let albums;
  const CACHE_EXPIRY = 1800;

  if (redis_db.isReady) {
    albums = await redis_db.get("albums");
  }

  if (albums) {
    console.log("redis cache");
    res
      .json({
        albums: JSON.parse(albums),
        message: "Albums recive Successfully",
      })
      .status(200);
    return;
  } else {
    console.log("redis miss");
    albums = await sql`SELECT * FROM albums`;
    if (redis_db.isReady) {
      await redis_db.set("albums", JSON.stringify(albums), {
        EX: CACHE_EXPIRY,
      });
    }
    return res
      .status(200)
      .json({ message: "Albums recive Successfully", albums: albums });
  }
});

export const allSongs = tryCatch(async (req, res) => {
  let songs;
  console.log('get all songs request')
  const CACHE_EXPIRY = 1800;
  if (redis_db.isReady) {
    songs = await redis_db.get("songs");
  }

  if (songs) {
    console.log("redis cahce songs");
    res
      .json({ songs: JSON.parse(songs), message: "Songs recieve Successfully" })
      .status(200);
    return;
  } else {
    console.log("redis cache miss for songs");
    songs = await sql`SELECT * FROM songs`;
    if (redis_db.isReady) {
      await redis_db.set("songs", JSON.stringify(songs), { EX: CACHE_EXPIRY });
    }
    return res
      .status(200)
      .json({ message: "Songs recieve Successfully", songs: songs });
  }
});

export const getSongByAlbumId = tryCatch(async (req, res) => {
  let albums, songs;
  const CACHE_EXPIRY=1800;
  const { id } = req.params;

  if(redis_db.isReady){
    const cacheDataAlbumSong = await redis_db.get(`album_song_${id}`)
    if(cacheDataAlbumSong){
        console.log("album id song redis cahce")
        res.json({data: JSON.parse(cacheDataAlbumSong)})
        return
    }
  }


  albums = await sql`SELECT * FROM albums WHERE id =${id}`;

  songs = await sql`SELECT * FROM songs WHERE album_id = ${id}`;

  if (albums.length === 0) {
    return res.status(404).json({ message: "Album Not Found" });
  }

  const response = { songs, albums: albums[0] };
  if(redis_db.isReady){
    console.log("cache miss")
    await redis_db.set(`album_song_${id}`, JSON.stringify(response),{EX:CACHE_EXPIRY})
  }

  return res.status(200).json({ message: "Success", data: response });
});

export const getOneSong = tryCatch(async (req, res) => {
  const { id } = req.params;
  const song = await sql`SELECT * FROM songs WHERE id = ${id}`;
  if (song.length === 0) {
    return res.json({ message: "Song Not Found" }).status(404);
  }
  return res.json({ data: song[0], message: "Success" }).status(200);
});
