import React, { useEffect, useRef } from 'react'

import { Flex } from '@chakra-ui/react'
import EditorJS from '@editorjs/editorjs'
import Header from '@editorjs/header'
import List from '@editorjs/list'
import Paragraph from '@editorjs/paragraph'

interface EditorProps {
    data?: any
    onChange?: (data: any) => void
}

const Editor: React.FC<EditorProps> = ({ data, onChange }) => {
    const editorRef = useRef<EditorJS | null>(null)
    const holderRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!holderRef.current) return

        const editor = new EditorJS({
            holder: holderRef.current,
            tools: {
                header: Header,
                list: List,
                paragraph: Paragraph,
            },
            data: data,
            onChange: async () => {
                const content = await editor.save()
                onChange && onChange(content)
            },
        })

        editorRef.current = editor

        return () => {
            if (editorRef.current && editorRef.current.destroy) {
                editorRef.current
                    .destroy()
                    .catch((e) => console.error('Error destroying editor:', e))
            }
        }
    }, [])

    return (
        <Flex p="2" overflowY={'scroll'} w="full" h="full">
            <Flex ref={holderRef} w="full" minH={'full'} flexDir={'column'} />
        </Flex>
    )
}

export default Editor
