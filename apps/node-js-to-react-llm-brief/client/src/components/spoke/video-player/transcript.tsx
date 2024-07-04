import React from 'react'
import { cn } from '@/lib/utils'

export interface Word {
    start_time: number
    end_time: number
    text: string
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

interface TranscriptProps {
    transcript: TranscriptEntry[]
    currentTime: number
    onWordClick: (time: number) => void
}

const Transcript: React.FC<TranscriptProps> = ({
    transcript,
    currentTime,
    onWordClick,
}) => {
    return (
        <div
            className="flex w-full h-full max-w-full overflow-y-auto overflow-x-hidden flex-col"
        >
            {transcript.map((entry, index) => (
                <div
                    className="flex flex-col w-full user-select-none"
                    key={index}
                >
                    <h6 className="text-md font-bold">
                        {entry.speaker}
                    </h6>

                    <div className='flex flex-wrap py-1 max-w-full'>
                        {entry.words.map((word, idx) => (
                            <p
                                className={cn("text-sm px-1 rounded-md w-fit px-0.5 bg-transparent cursor-pointer", { 
                                    "bg-blue-500 text-white": currentTime >= word.start_time && currentTime <= word.end_time
                                })}
                                key={idx}
                                onClick={() => onWordClick(word.start_time)}
                            >
                                {word.text}{' '}
                            </p>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Transcript