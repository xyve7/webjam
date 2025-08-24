import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import SongEntries from "./song-entries";
import { getAlbumInfo, getAlbumSongs } from "@/lib/actions";
import { Label } from "@/components/ui/label";

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
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
	
    const album_info: AlbumInfo = await getAlbumInfo(slug);
    const album_songs: SongInfo[] = await getAlbumSongs(slug) 

    return (
		<div>
			<div className="flex flex-1 flex-col overflow-auto justify-center p-8 pt-12 space-y-4">
				<div className="flex flex-row space-x-16">
					<div className="flex flex-row">
						<img
							className="h-64 w-64"
							src={`http://192.168.0.153:8080/albums/${album_info.uuid}/cover`}
						/>
					</div>
					<div className="flex flex-1 flex-col justify-center space-y-2">
						<Label className="text-2xl font-bold">
							{album_info.title}
						</Label>
						<Label className="text-2xl text-muted-foreground">
							{album_info.artist}
						</Label>
						<Label className="text-2xl text-muted-foreground">
							{album_info.year}
						</Label>
						<Label className="text-2xl text-muted-foreground">
							{album_info.total_tracks} Tracks
						</Label>
					</div>
				</div>
				<Table>
					<TableCaption>{album_info.year}</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead>Track</TableHead>
							<TableHead>Title</TableHead>
							<TableHead>Artist</TableHead>
							<TableHead>Composer</TableHead>
							<TableHead>Year</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						<SongEntries songs={album_songs} album={album_info} key={album_info.uuid} />
					</TableBody>
				</Table>
			</div>
			<div className="h-24 bottom-0 w-full"></div>
		</div>
	);
}