import { Container, Flex } from '@chakra-ui/react'
import React, { useCallback, useEffect, useRef, useState } from 'react'

import { MediaPlayerInstance } from '@vidstack/react'
import TranscriptComponent from './components/Transcript'
import { VideoPlayer } from './components/VideoPlayer'
import useMeetingData from './hooks/useMeetingData'

const App: React.FC = () => {
    const [botId, setBotId] = useState<string | null>(null)
    const [apiKey, setApiKey] = useState<string | null>(null)
    const [currentTime, setCurrentTime] = useState(0)
    const [videoPlayer, setVideoPlayer] = useState<MediaPlayerInstance | null>(
        null,
    )
    const transcriptRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const url = new URL(window.location.href)
        const pathParts = url.pathname.split('/')
        const lastPathPart = pathParts[pathParts.length - 1]

        setBotId(lastPathPart)
        setApiKey(url.searchParams.get('api_key'))
    }, [])

    const { meetingData, loading, error } = useMeetingData(botId, apiKey)

    const handleTimeUpdate = useCallback(
        (time: number) => {
            setCurrentTime(time)

            if (transcriptRef.current && meetingData) {
                const currentWord = meetingData.bot_data.transcripts
                    .flatMap((entry) => entry.words)
                    .find(
                        (word) =>
                            time >= word.start_time && time <= word.end_time,
                    )

                if (currentWord) {
                    const wordElement = transcriptRef.current.querySelector(
                        `[data-time="${currentWord.start_time}"]`,
                    )
                    if (wordElement) {
                        wordElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'center',
                        })
                    }
                }
            }
        },
        [meetingData],
    )

    const handleSeek = useCallback(
        (time: number) => {
            if (videoPlayer) {
                videoPlayer.currentTime = time
            }
        },
        [videoPlayer],
    )

    const setPlayerRef = useCallback((player: MediaPlayerInstance) => {
        setVideoPlayer(player)
    }, [])

    if (!botId || !apiKey) {
        return <div>Loading URL parameters...</div>
    }

    if (loading) return <div>Loading meeting data...</div>
    if (error) return <div>Error: {error}</div>
    if (!meetingData) return <div>No meeting data available</div>

    return (
        <Flex h="100vh" w="100vw" flexDir={'row'} bg="neutral.700">
            <Container
                flexDir={'column'}
                h="full"
                maxH="full"
                w={'full'}
                gap="4"
                p={{ base: 2, lg: 4 }}
                maxW="4xl"
                overflow={'clip'}
                centerContent
                rounded={'md'}
            >
                <Flex width={'full'} mx="auto" maxW="2xl">
                    <VideoPlayer
                        setPlayer={setPlayerRef}
                        src={meetingData.mp4}
                        onTimeUpdate={handleTimeUpdate}
                        assetTitle={meetingData.name || 'Meeting Video'}
                    />
                </Flex>
                <div
                    ref={transcriptRef}
                    style={{ width: '100%', overflowY: 'auto' }}
                >
                    <TranscriptComponent
                        transcript={meetingData.bot_data.transcripts}
                        currentTime={currentTime}
                        onWordClick={handleSeek}
                    />
                </div>
            </Container>
        </Flex>
    )
}

export default App
