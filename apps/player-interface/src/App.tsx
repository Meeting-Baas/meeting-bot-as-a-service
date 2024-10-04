import { Container, Flex } from '@chakra-ui/react'
import React, { useCallback, useRef, useState } from 'react'

import { MediaPlayerInstance } from '@vidstack/react'
import TranscriptComponent from './components/Transcript'
import { VideoPlayer } from './components/VideoPlayer'
import useMeetingData from './hooks/useMeetingData'

const App: React.FC = () => {
    const botId = 'f479f395-3f88-4922-85c9-2018906a8003'
    const { meetingData, loading, error } = useMeetingData(botId)

    const [currentTime, setCurrentTime] = useState(0)
    const [videoPlayer, setVideoPlayer] = useState<MediaPlayerInstance | null>(
        null,
    )
    const transcriptRef = useRef<HTMLDivElement>(null)

    const handleTimeUpdate = useCallback(
        (time: number) => {
            setCurrentTime(time)

            // Scroll to the current word in the transcript
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

    if (loading) return <div>Loading...</div>
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
                        // src="http://localhost:9000/bots-videos/3/fpdtoxso1d/758.mp4"
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
