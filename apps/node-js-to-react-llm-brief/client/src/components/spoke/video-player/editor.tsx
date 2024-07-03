import React, { useEffect, useRef } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Paragraph from '@editorjs/paragraph';

interface EditorProps {
    data?: any;
    onChange?: (data: any) => void;
}

const Editor: React.FC<EditorProps> = ({ data, onChange }) => {
    const editorRef = useRef<EditorJS | null>(null);
    const holderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!holderRef.current) return;

        const editor = new EditorJS({
            holder: holderRef.current,
            tools: {
                header: Header,
                list: List,
                paragraph: Paragraph,
            },
            data: data,
            onChange: async () => {
                const content = await editor.save();
                onChange && onChange(content);
            },
        });

        editorRef.current = editor;

        return () => {
            if (editorRef.current && editorRef.current.destroy) {
                editorRef.current
                    .destroy()
                    .catch((e) => console.error('Error destroying editor:', e));
            }
        };
    }, []);

    return (
        <div className="p-2 overflow-y-scroll w-full h-full">
            <div ref={holderRef} className="w-full min-h-full flex flex-col" />
        </div>
    );
}

export default Editor;
