import { Center, Flex, FlexProps } from '@chakra-ui/react'

import { ReactNode } from 'react'

interface CardProps extends FlexProps {
    header?: ReactNode
    bodyContent?: ReactNode
    title: string
    isTogglable?: boolean
    toggleCard: (title: string) => void
    isOpen: boolean
}

export const Card: React.FC<CardProps> = ({
    header,
    bodyContent,
    title,
    isTogglable = false,
    toggleCard,
    isOpen,
    ...rest
}) => {
    const handleClick = () => {
        if (isTogglable) {
            toggleCard(title)
        }
    }

    return (
        <Flex
            {...rest}
            w="full"
            minH={isOpen ? '15%' : '40px'}
            maxW="full"
            flexDir={'column'}
            flexGrow={{
                base: isOpen ? 1 : 0,
                lg: isOpen ? 1 : 0,
            }}
            rounded={'xl'}
            overflow={'clip'}
            bg="white"
            onClick={handleClick}
            border="1px"
            borderColor={'neutral.400'}
        >
            {header != null && (
                <Center
                    px="8px"
                    w="full"
                    minH="40px"
                    justifyContent={'space-between'}
                    userSelect="none"
                    cursor={isTogglable ? 'pointer' : ''}
                    borderBottom={'1px'}
                    borderColor="neutral.100"
                    color="neutral.900"
                >
                    {header}
                </Center>
            )}
            {isOpen && (
                <Flex
                    flexGrow={{ base: 0, lg: 1 }}
                    w="full"
                    overflow={'hidden'}
                >
                    <Flex flexDir={'column'} h="full" w="full">
                        <> {bodyContent}</>
                    </Flex>
                </Flex>
            )}
        </Flex>
    )
}
