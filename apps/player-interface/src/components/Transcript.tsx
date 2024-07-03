import { Flex, Heading, Text, Wrap } from '@chakra-ui/react'

import React from 'react'
import { TranscriptEntry } from '../type'

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
        <Flex
            h="full"
            w="full"
            maxW={'full'}
            overflowY="scroll"
            overflowX="hidden"
            flexDir={'column'}
            p={{ base: '4px', lg: '8px' }}
        >
            {transcript.map((entry, index) => (
                <Flex
                    flexDir={'column'}
                    w="full"
                    key={index}
                    userSelect={'none'}
                >
                    <Heading as="h6" size="sm" fontWeight="bold" px="1">
                        {entry.speaker}
                    </Heading>

                    <Wrap w="full" py="1" maxW={'full'} textAlign={'justify'}>
                        {entry.words.map((word, idx) => (
                            <Text
                                key={idx}
                                rounded="md"
                                w="fit-content"
                                px="0.5"
                                bgColor={
                                    currentTime >= word.start &&
                                    currentTime <= word.end
                                        ? 'blue'
                                        : 'transparent'
                                }
                                color={
                                    currentTime >= word.start &&
                                    currentTime <= word.end
                                        ? 'white'
                                        : 'black'
                                }
                                onClick={() => onWordClick(word.start)}
                                cursor={'pointer'}
                            >
                                {word.word}{' '}
                            </Text>
                        ))}
                    </Wrap>
                </Flex>
            ))}
        </Flex>
    )
}

export default Transcript
