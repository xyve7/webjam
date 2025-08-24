"use server";
interface Songs {
    songs: string[]
}

interface AlbumInfo {
    uuid: string,
    title: string,
    artist: string,
    year: number,
    total_tracks: number
}
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
interface Playlists {
    playlists: string[]
}

interface PlaylistInfo {
    uuid: string,
    title: string,
    description: string
}

interface Albums {
    albums: string[]
}

interface AlbumInfo {
    uuid: string,
    title: string,
    artist: string,
    year: number,
    total_tracks: number
}
export async function uploadSongs(formData: FormData): Promise<boolean> {
	const response = await fetch("http://localhost:8080/songs", {
		method: "POST",
		body: formData,
	});
    return response.ok
}
export async function getAlbumInfo(uuid: string): Promise<AlbumInfo> {
	const response = await fetch(`http://localhost:8080/albums/${uuid}`);
	const album_info: AlbumInfo = await response.json();

	return album_info;
}
export async function getAlbumSongs(album_uuid: string): Promise<SongInfo[]> {
	const response = await fetch(
		`http://localhost:8080/albums/${album_uuid}/songs`
	);
	const data: Songs = await response.json();
	const album_songs: SongInfo[] = await Promise.all(
		data.songs.map(async (song_uuid: string) => {
			const response = await fetch(`http://localhost:8080/songs/${song_uuid}`);
			const data: SongInfo = await response.json();
			return data;
		})
	);
	album_songs.sort((a, b) => {
		return a.track_number - b.track_number;
	});
    return album_songs;
}

export async function getAlbums(): Promise<AlbumInfo[]> {
    const response = await fetch('http://localhost:8080/albums');
    const data: Albums = await response.json();
    const albums: AlbumInfo[] = await Promise.all(data.albums.map(async (uuid: string) => {
        const response = await fetch(`http://localhost:8080/albums/${uuid}`);
        const data: AlbumInfo = await response.json();
        return data
    }))
    return albums;
}
export async function getPlaylists(): Promise<PlaylistInfo[]> {
    const response = await fetch('http://localhost:8080/playlists');
    const data: Playlists = await response.json();
    const playlists: PlaylistInfo[] = await Promise.all(data.playlists.map(async (uuid: string) => {
        const response = await fetch(`http://localhost:8080/playlists/${uuid}`);
        const data: PlaylistInfo = await response.json();
        return data
    }))
    return playlists;
}