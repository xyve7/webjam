"use client";
import { TableCell, TableRow } from "@/components/ui/table";
import { create } from "zustand";

interface SongInfo {
	uuid: string;
	title: string;
	album: string;
	artist: string;
	composer: string;
	year: number;
	track_number: number;
	total_tracks: number;
	disc_number: number;
	total_discs: number;
}
interface AlbumInfo {
    uuid: string,
    title: string,
    artist: string,
    year: number,
    total_tracks: number
}
export interface PlayerState {
	songs: SongInfo[];
	currentSong: number;
	album: AlbumInfo | null;
	setSongs: (songs: SongInfo[]) => void;
	setCurrentSong: (currentSong: number) => void;	
	setAlbum: (album: AlbumInfo) => void;	
}

export const useSongsStore = create<PlayerState>()((set) => ({
	songs: [],
	currentSong: -1,
	album: null,
	setSongs: (songs) => set((state) => ({ songs: songs })),
	setCurrentSong: (currentSong) => set((state) => ({ currentSong: currentSong })),
	setAlbum: (album) => set((state) => ({ album: album })),
}));

export default function SongEntries({ songs, album }: { songs: SongInfo[], album: AlbumInfo }) {
	const setSongs = useSongsStore((state) => state.setSongs);
	const setAlbum = useSongsStore((state) => state.setAlbum);
	const currentSong = useSongsStore((state) => state.currentSong);
	const setCurrentSong = useSongsStore((state) => state.setCurrentSong);
	setSongs(songs)
	setAlbum(album)
	return (
		<>
			{songs.map((song, i) => {
				return (
					<TableRow
						key={song.uuid}
						onClick={() => setCurrentSong(i)}
						className={currentSong === i && 'bg-muted' || 'bg-background'}
					>
						<TableCell>{song.track_number}</TableCell>
						<TableCell>{song.title}</TableCell>
						<TableCell>{song.artist}</TableCell>
						<TableCell>{song.composer}</TableCell>
						<TableCell>{song.year}</TableCell>
					</TableRow>
				);
			})}
		</>
	);
}
