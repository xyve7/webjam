"use client";
import { useSongsStore } from "@/app/album/[slug]/song-entries";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Pause,
	Play,
	RefreshCw,
	RefreshCwOff,
	Shuffle,
	SkipBack,
	SkipForward,
	Volume,
	Volume1,
	Volume2,
	VolumeX,
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

function AudioControl() {
	const songs = useSongsStore((state) => state.songs);
	const currentSong = useSongsStore((state) => state.currentSong);
	const album = useSongsStore((state) => state.album);
	const setCurrentSong = useSongsStore((state) => state.setCurrentSong);

	const player = useRef<HTMLAudioElement | null>(null);

	const [isPlaying, setIsPlaying] = useState(true);
	const [isLoop, setIsLoop] = useState(false);
	const [isShuffle, setIsShuffle] = useState(false);
	const [currentTime, setCurrentTime] = useState(0);
	const [currentVolume, setCurrentVolume] = useState(0.5);

	const onPausePlay = async () => {
		if (isPlaying) {
			player.current?.pause();
			setIsPlaying(false);
		} else {
			player.current?.play();
			setIsPlaying(true);
		}
	};

	const onLoop = async () => {
		setIsLoop((value) => !value);
	};

	const nextSong = async () => {
		const nextSongIndex = (currentSong + 1) % songs.length;
		setCurrentSong(nextSongIndex);
	};
	const prevSong = async () => {
		const prevSongIndex = (songs.length + currentSong - 1) % songs.length;
		setCurrentSong(prevSongIndex);
	};

	const onSeek = async (value: number[]) => {
		if (player.current) {
			player.current.currentTime = value[0];
			player.current?.play();
			setIsPlaying(true);
		}
	};

	const onVolume = async (value: number[]) => {
		if (player.current) {
			player.current.volume = value[0];
			setCurrentVolume(value[0]);
		}
	};
	const onShuffle = async () => {
		setIsShuffle((value) => !value);
	};

	const onBack = async () => {
		if (currentTime < 10) {
			prevSong();
		} else {
			onSeek([0]);
		}
	};
	const onNext = async () => {
		if (isShuffle) {
			setCurrentSong(Math.floor(Math.random() * songs.length));
		} else {
			nextSong();
		}
	};

	const onEnd = async () => {
		nextSong();
	};

	const onUpdate = async () => {
		setCurrentTime(player.current!.currentTime);
	};

	const formatTime = (time: number): string => {
		const minute = Math.floor(time / 60);
		const second = Math.floor(time % 60);

		const formatedMinute = String(minute).padStart(2, "0");
		const formatedSecond = String(second).padStart(2, "0");

		return `${formatedMinute}:${formatedSecond}`;
	};

	const getUrl = (): string => {
		const selectedSong = songs[currentSong];
		return `http://192.168.0.153:8080/stream/${selectedSong.uuid}`;
	};

	return (
		<>
			{songs[currentSong] && (
				<audio
					src={getUrl()}
					ref={player}
					autoPlay
					onTimeUpdate={onUpdate}
					loop={isLoop}
					preload="none"
					onEnded={onEnd}
				></audio>
			)}
			{player.current && (
				<div className="flex flex-row justify-between h-full w-full ">
					<div className="flex flex-1 flex-row items-center px-8 space-x-4">
						<div>
							<img
								className="h-16 w-16"
								src={`http://192.168.0.153:8080/albums/${
									album!.uuid
								}/cover`}
							/>
						</div>
						<div className="flex flex-1 flex-col justify-center space-y-2">
							<Label className="text-muted-foreground">
								Now Playing
							</Label>
							<Label className="font-bold">
								{songs[currentSong].title}
							</Label>
						</div>
					</div>
					<div
						className="flex flex-1 flex-col items-center justify-center 
                        space-y-4"
					>
						<div className="flex flex-row space-x-2">
							<Label className="text-muted-foreground">
								{formatTime(currentTime)}
							</Label>
							<Slider
								className="w-[300px]"
								defaultValue={[0]}
								value={[currentTime]}
								max={player.current!.duration}
								step={1}
								onValueChange={onSeek}
							/>
							<Label className="text-muted-foreground">
								{formatTime(player.current!.duration)}
							</Label>
						</div>
						<div className="space-x-2">
							<Button variant="ghost" onClick={onShuffle}>
								{!isShuffle && <Shuffle />}
								{isShuffle && (
									<Shuffle className="text-green-500" />
								)}
							</Button>
							<Button variant="secondary" onClick={onBack}>
								<SkipBack />
							</Button>
							<Button onClick={onPausePlay}>
								{isPlaying && <Pause />}
								{!isPlaying && <Play />}
							</Button>
							<Button variant="secondary" onClick={onNext}>
								<SkipForward />
							</Button>
							<Button variant="ghost" onClick={onLoop}>
								{isLoop && (
									<RefreshCw className="text-green-500" />
								)}
								{!isLoop && <RefreshCw />}
							</Button>
						</div>
					</div>
					<div className="flex flex-1 flex-row px-8 space-x-2 justify-end items-center">
						{currentVolume == 0.0 && <VolumeX />}
						{currentVolume > 0.0 && currentVolume < 0.33 && (
							<Volume />
						)}
						{currentVolume >= 0.33 && currentVolume < 0.66 && (
							<Volume1 />
						)}
						{currentVolume >= 0.66 && <Volume2 />}
						<Slider
							className="w-[100px]"
							value={[currentVolume]}
							defaultValue={[0.5]}
							max={1}
							step={0.01}
							onValueChange={onVolume}
						/>
					</div>
				</div>
			)}
		</>
	);
}

export default function AudioBar() {
	return (
		<>
			<div className="z-50 h-24 shadow-2xl bg-background border-t-2 fixed bottom-0 right-0 w-full">
				<AudioControl />
			</div>
		</>
	);
}
