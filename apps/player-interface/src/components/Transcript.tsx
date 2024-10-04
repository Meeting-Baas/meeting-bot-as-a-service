import { Flex, Heading, Text, Wrap } from '@chakra-ui/react'

import React from 'react'
import { Transcript } from '../type'

interface TranscriptProps {
    transcript: Transcript[]
    currentTime: number
    onWordClick: (time: number) => void
}

const TranscriptComponent: React.FC<TranscriptProps> = ({
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
                                    currentTime >= word.start_time &&
                                    currentTime <= word.end_time
                                        ? 'blue'
                                        : 'transparent'
                                }
                                color={
                                    currentTime >= word.start_time &&
                                    currentTime <= word.end_time
                                        ? 'white'
                                        : 'black'
                                }
                                onClick={() => onWordClick(word.start_time)}
                                cursor={'pointer'}
                            >
                                {word.text}{' '}
                            </Text>
                        ))}
                    </Wrap>
                </Flex>
            ))}
        </Flex>
    )
}

export default TranscriptComponent
