'use client';

import CreateBlog from "@/components/adminpanel/CreateBlog";
import { useState } from "react";

export default function CardWithForm() {
  const [post, setPost] = useState("");
  const [title, setTitle] = useState("");
  const [imageBase64, setImageBase64] = useState(""); 

  const onChange = (content) => setPost(content);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result); 
      };
      reader.readAsDataURL(file);
    }
  };

  async function handleCreate() {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", post);
      if (imageBase64) {
        formData.append("image", imageBase64); 
      }

      const response = await fetch("/api/blog", {
        method: "POST",
        body: formData,
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
    <CreateBlog
      title={title}
      post={post}
      onChange={onChange}
      handleCreate={handleCreate}
      imageBase64={imageBase64}
      setImageBase64={setImageBase64}
      setTitle={setTitle}
      handleImageChange={handleImageChange} 
    />
  );
}
