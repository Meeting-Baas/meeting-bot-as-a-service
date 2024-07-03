import React, { useCallback, useEffect, useState } from 'react';
import Player from 'video.js/dist/types/player';
import { Card } from './card';
import Editor from './editor';
import Transcript from './transcript';
import { VideoPlayer } from './video-player';
import { VideoData } from './type';


export interface Word {
    start: number
    end: number
    word: string
}

export interface TranscriptEntry {
    speaker: string
    words: Word[]
}

export interface VideoData {
    event: string
    data: {
        bot_id: string
        transcript: TranscriptEntry[]
        speakers: string[]
        mp4: string
    }
}

const VideoRenderer = ({ jsonData }: { jsonData: VideoData }) => {
    const [isHover, setIsHover] = useState(false);
    const [width, setWidth] = useState(30);
    const [isDragging, setIsDragging] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [videoPlayer, setVideoPlayer] = useState<Player | null>(null);
    const [editorData, setEditorData] = useState({});

    const videoData: VideoData = jsonData as VideoData;

    const handleEditorChange = (data: any) => {
        setEditorData(data);
    };
    const handleMouseDown = useCallback(() => {
        setIsDragging(true);
    }, []);

    const handleMouseMove = useCallback(
        (e: MouseEvent) => {
            if (isDragging) {
                let newWidth = (e.clientX / window.innerWidth) * 100;
                newWidth = Math.min(Math.max(newWidth, 35), 65);
                setWidth(newWidth);
            }
        },
        [isDragging]
    );

    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
    }, []);

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [handleMouseMove, handleMouseUp]);

    const handleTimeUpdate = useCallback((time: number) => {
        setCurrentTime(time);
    }, []);

    const handleSeek = useCallback(
        (time: number) => {
            if (videoPlayer) {
                videoPlayer.currentTime(time);
            }
        },
        [videoPlayer]
    );

    const setPlayerRef = useCallback((player: Player) => {
        setVideoPlayer(player);
    }, []);

    return (
        <div className="flex h-screen w-screen bg-gray-100 gap-4 p-4 flex-col lg:flex-row">
            <div
                className="flex flex-col h-full min-w-full lg:min-w-[calc(30%-1rem)] w-full lg:w-[calc(30%-1rem)] gap-4"
                style={{ minWidth: `${width}%` }}
            >
                <div className='block'>
                    <VideoPlayer
                        url={videoData.data.mp4}
                        onTimeUpdate={handleTimeUpdate}
                        setPlayerRef={setPlayerRef}
                    />
                </div>

                <Card
                    header={
                        <p className="text-md font-semibold">Transcript</p>
                    }
                    title="Transcript"
                    isOpen={true}
                    toggleCard={() => {}}
                    bodyContent={
                        <Transcript
                            transcript={videoData.data.transcript}
                            currentTime={currentTime}
                            onWordClick={handleSeek}
                        />
                    }
                />
            </div>
            <div
                className="hidden lg:flex items-center px-0.5 h-full gap-0.5 cursor-ew-resize"
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
                onMouseDown={handleMouseDown}
                style={{ opacity: isHover || isDragging ? '1' : '0' }}
            >
                <div className="h-12 cursor-ew-resize w-1 bg-black rounded-full"></div>
                <div className="h-12 cursor-ew-resize w-1 bg-black rounded-full"></div>
            </div>
            <Card
                header={
                    <p className="text-md font-semibold">Editor</p>
                }
                title="Editor"
                isOpen={true}
                toggleCard={() => {}}
                bodyContent={
                    <Editor data={editorData} onChange={handleEditorChange} />
                }
            />
        </div>
    );
};

export default VideoRenderer;
