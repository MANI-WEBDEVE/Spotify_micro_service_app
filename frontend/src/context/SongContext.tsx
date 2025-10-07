import axios from "axios";
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react"

const server = "http://localhost:6000";

export interface Song {
    id: string;
    title: string;
    thumnail: string;
    description: string;
    audio: string;
    album: string
}

export interface Album {
    id: string;
    title: string;
    thumnail: string;
    description: string;
}

interface SongContextType {
    songs: Song[];
}

interface SongContextProviderProps {
    children: ReactNode;
}

const SongContext = createContext<SongContextType | undefined>(undefined);

export const SongContextProvider: React.FC<SongContextProviderProps> = ({ children }) => {
    const [songs, setSongs] = useState<Song[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [selectedSong, setSelectedSong] = useState<string | null>()
    const [isPlaying, setIsPlaying] = useState<boolean>(false)


    const fetchSongs = useCallback(async()=>{
        setLoading(true)
        try{
            const response = await axios.get<Song[]>(`${server}/api/v1/songs/all`)
            setSongs(response.data)
            console.log('raw data',response.data)
            if(response.data.length > 0){
                setSelectedSong(response.data[0].id.toString())
                console.log('first song id',response.data[0].id.toString())
            }
            setIsPlaying(false)
        } catch (error) {
            console.error("Error fetching songs:", error)
        } finally {
            setLoading(false)
        }
    }, [])
    useEffect(() => {
        fetchSongs()
    }, [])
    return (
        <SongContext.Provider value={{ songs }}>{children}</SongContext.Provider>
    )
}

export const useSongContext = () => {

    const context = useContext(SongContext);
    if (context === undefined) {
        throw new Error("useSongContext must be used within a SongContextProvider");
    }
    return context;

}