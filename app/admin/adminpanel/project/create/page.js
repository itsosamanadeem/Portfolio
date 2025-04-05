'use client';

import CreateProject from "@/components/project/CreateProject";
import { useState } from "react";

export default function CreateProjectClientSide() {
  const [post, setPost] = useState("");
  const [title, setTitle] = useState("");
  const [imageBase64, setImageBase64] = useState(""); 
  const [position, setPosition] = useState(null);
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
      formData.append("position", position);

      if (imageBase64) {
        formData.append("image", imageBase64); 
      }

      const response = await fetch("/api/project", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        alert("Project created successfully!");
      } else {
        alert("Failed to create project.");
      }
    } catch (error) {
      console.error("Error creating project:", error);
    }
  }

  return (
    <CreateProject
      title={title}
      post={post}
      onChange={onChange}
      handleCreate={handleCreate}
      imageBase64={imageBase64}
      setImageBase64={setImageBase64}
      setTitle={setTitle}
      handleImageChange={handleImageChange} 
      position={position}
      setPosition={setPosition}
    />
  );
}
