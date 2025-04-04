'use client'

import { EditorContent, useEditor } from '@tiptap/react'
import MenuBar from './menu_bar'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import Highlight from "@tiptap/extension-highlight";
import Image from '@tiptap/extension-image'
import VideoExtension from './VideoExtension'  
import React, { useEffect, useRef } from 'react'

const Tiptap = ({ content, onChange }) => {
    const hasSetInitialContent = useRef(false);

    const editor = useEditor({
        extensions: [
            StarterKit,
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
            Highlight,
            Image,
            VideoExtension, 
        ],
        content,
        editorProps: {
            attributes: {
                class: "h-full border rounded-md  py-2 px-3",
            },
        },
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    useEffect(() => {
        if (editor && content && !hasSetInitialContent.current) {
            editor.commands.setContent(content);
            hasSetInitialContent.current = true;
        }
    }, [editor, content]);
    if (!editor) return null;

    return (
        <>
            <MenuBar editor={editor} />
            <EditorContent editor={editor} />
        </>
    );
}

export default Tiptap;
