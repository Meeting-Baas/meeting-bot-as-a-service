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
            rounded={'md'}
            bg="neutral.900"
            h="full"
            w="full"
            maxW={'full'}
            overflowY="scroll"
            overflowX="hidden"
            flexDir={'column'}
            p={{ base: '2', lg: '4' }}
        >
            {transcript.map((entry, index) => (
                <Flex
                    flexDir={'column'}
                    w="full"
                    key={index}
                    userSelect={'none'}
                >
                    <Heading
                        as="h6"
                        size="sm"
                        fontWeight="bold"
                        px="1"
                        color={'neutral.50'}
                        opacity={'80%'}
                    >
                        {entry.speaker}
                    </Heading>

                    <Wrap
                        w="full"
                        py="2"
                        maxW={'full'}
                        textAlign={'justify'}
                        pl="4"
                    >
                        {entry.words.map((word, idx) => (
                            <Text
                                key={idx}
                                rounded="md"
                                w="fit-content"
                                px="0.5"
                                bgColor={
                                    currentTime >= word.start_time &&
                                    currentTime <= word.end_time
                                        ? 'primary.500'
                                        : 'transparent'
                                }
                                color={
                                    currentTime >= word.start_time &&
                                    currentTime <= word.end_time
                                        ? 'neutral.900'
                                        : 'neutral.200'
                                }
                                onClick={() => onWordClick(word.start_time)}
                                cursor={'pointer'}
                                data-time={word.start_time}
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
