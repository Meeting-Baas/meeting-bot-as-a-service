import { Box, Center, Flex, Text } from '@chakra-ui/react'
import React, { useCallback, useEffect, useState } from 'react'

import { Card } from './components/Card'
import Editor from './components/Editor'
import Player from 'video.js/dist/types/player'
import TranscriptComponent from './components/Transcript'
import { VideoPlayer } from './components/VideoPlayer'
import useMeetingData from './hooks/useMeetingData' // Assurez-vous que le chemin d'importation est correct

const App: React.FC = () => {
    const botId = '1e98af82-db45-46ac-b11a-8bd9d60a3486' // Votre bot ID
    const { meetingData, loading, error } = useMeetingData(botId)

    const [isHover, setIsHover] = useState(false)
    const [width, setWidth] = useState(30)
    const [isDragging, setIsDragging] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [videoPlayer, setVideoPlayer] = useState<Player | null>(null)
    const [editorData, setEditorData] = useState({})

    const handleEditorChange = (data: any) => {
        setEditorData(data)
    }

    const handleMouseDown = useCallback(() => {
        setIsDragging(true)
    }, [])

    const handleMouseMove = useCallback(
        (e: MouseEvent) => {
            if (isDragging) {
                let newWidth = (e.clientX / window.innerWidth) * 100
                newWidth = Math.min(Math.max(newWidth, 35), 65)
                setWidth(newWidth)
            }
        },
        [isDragging],
    )

    const handleMouseUp = useCallback(() => {
        setIsDragging(false)
    }, [])

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('mouseup', handleMouseUp)
        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('mouseup', handleMouseUp)
        }
    }, [handleMouseMove, handleMouseUp])

    const handleTimeUpdate = useCallback((time: number) => {
        setCurrentTime(time)
    }, [])

    const handleSeek = useCallback(
        (time: number) => {
            if (videoPlayer) {
                videoPlayer.currentTime(time)
            }
        },
        [videoPlayer],
    )

    const setPlayerRef = useCallback((player: Player) => {
        setVideoPlayer(player)
    }, [])

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>
    if (!meetingData) return <div>No meeting data available</div>

    return (
        <Flex
            h="100vh"
            w="100vw"
            bg="gray.100"
            gap="4"
            p="4"
            flexDir={{ base: 'column', lg: 'row' }}
        >
            <Flex
                flexDir={'column'}
                h="full"
                minW={{ base: 'full', lg: `${width}%` }}
                w={{ base: 'full', lg: `${width}%` }}
                gap="4"
            >
                <VideoPlayer
                    url={meetingData.mp4}
                    onTimeUpdate={handleTimeUpdate}
                    setPlayerRef={setPlayerRef}
                />

                <Card
                    header={
                        <Text size="md" fontWeight={'semibold'}>
                            Transcript
                        </Text>
                    }
                    title="Transcript"
                    isOpen={true}
                    toggleCard={() => {}}
                    bodyContent={
                        <TranscriptComponent
                            transcript={meetingData.bot_data.transcripts}
                            currentTime={currentTime}
                            onWordClick={handleSeek}
                        />
                    }
                />
            </Flex>
            <Center
                display={{ base: 'none', lg: 'flex' }}
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
                px="2px"
                h="full"
                gap="2px"
                cursor="ew-resize"
                onMouseDown={handleMouseDown}
                opacity={isHover || isDragging ? '1' : '0'}
            >
                <Box
                    h="50px"
                    cursor="ew-resize"
                    w="4px"
                    bg="black"
                    rounded="full"
                />
                <Box
                    h="50px"
                    cursor="ew-resize"
                    w="4px"
                    bg="black"
                    rounded="full"
                />
            </Center>
            <Card
                header={
                    <Text size="md" fontWeight={'semibold'}>
                        Editor
                    </Text>
                }
                title="Editor"
                isOpen={true}
                toggleCard={() => {}}
                bodyContent={
                    <Editor data={editorData} onChange={handleEditorChange} />
                }
            />
        </Flex>
    )
}

export default App
