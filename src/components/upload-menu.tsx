'use client'
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Loader2Icon, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { uploadSongs } from "@/lib/actions";
import { FormEvent, useState } from "react";
export default function UploadMenuItem() {
	const [open, setOpen] = useState(false)
	const [uploading, setUploading] = useState(false)

	async function onSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setUploading(true);
		const formData = new FormData(e.currentTarget);
		const ok = await uploadSongs(formData);
		if (ok) {
			setOpen(false)
		}
	}
	return (
		<SidebarMenuItem key={"upload"}>
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger>
					<SidebarMenuButton asChild>
						<a>
							<Upload />
							<span>Upload</span>
						</a>
					</SidebarMenuButton>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Upload </DialogTitle>
						<DialogDescription>
							The metadata of all uploaded files will be parsed to
							create albums. Make sure the metadata is intact
							before uploading.
						</DialogDescription>
					</DialogHeader>
					<form
						onSubmit={onSubmit}
						className="flex flex-col space-y-4"
					>
						<input
							type="file"
							name="songs"
							multiple
							accept=".flac"
						></input>
						<Button type="submit" disabled={uploading}>
							{uploading && <Loader2Icon className="animate-spin"/>}
							Upload
						</Button>
					</form>
				</DialogContent>
			</Dialog>
		</SidebarMenuItem>
	);
}
