// types.ts
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
