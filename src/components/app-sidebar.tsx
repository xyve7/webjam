import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ListMusic, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import UploadMenuItem from "./upload-menu";
import { getAlbums, getPlaylists } from "@/lib/actions";
import { ModeToggle } from "./mode-toggle";


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

export default async function AppSidebar() {
    // Get all of the playlist UUIDs, and then fetch their information individually
    const playlists: PlaylistInfo[] = await getPlaylists();
    // Get all of the album UUIDs, and then fetch their information individually
    const albums: AlbumInfo[] = await getAlbums();    
	return (
		<Sidebar>
			<SidebarContent>
				<div className="p-4">
					<ModeToggle />
				</div>
				<SidebarGroup>
					<SidebarGroupLabel>Music</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							<UploadMenuItem />
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
				<SidebarGroup>
					<SidebarGroupLabel>Playlists</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{playlists.map((playlist: PlaylistInfo) => (
								<SidebarMenuItem key={playlist.uuid}>
									<SidebarMenuButton asChild>
										<a href={`/playlist/${playlist.uuid}`}>
											<ListMusic />
											<span>{playlist.title}</span>
										</a>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
				<SidebarGroup>
					<SidebarGroupLabel>Albums</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{albums.map((album: AlbumInfo) => (
								<SidebarMenuItem key={album.uuid}>
									<SidebarMenuButton asChild>
										<a href={`/album/${album.uuid}`}>
											<ListMusic />
											<span>{album.title}</span>
										</a>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
}
