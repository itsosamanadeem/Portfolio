'use client';

import * as React from "react";
import { useState } from "react";
import CurdBlog from "@/components/adminpanel/CrudBlog";

export default function CardWithForm() {
    const [post, setPost] = useState("");
    const [title, setTitle] = useState("");
    const [isEditing, setIsEditing] = useState(true);
    const [postId, setPostId] = useState(null);

    const onChange = (content) => {
        setPost(content);
    };


    async function handleCreate() {
        try {
            const response = await fetch('/api/blog', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, content: post }),
            });

            const data = await response.json();
            console.log(data);

            if (response.ok) {
                alert("Blog created successfully!");
            } else {
                alert("Failed to create blog.");
            }
        } catch (error) {
            console.error("Error creating blog:", error);
        }
    }
    return (
        <>
            <CurdBlog title={title} post={post} onChange={onChange} handleCreate={handleCreate}/>
        </>
    );
}