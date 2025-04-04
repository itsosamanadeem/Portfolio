'use client';

import { useState } from "react";
import CurdBlog from "@/components/adminpanel/CrudBlog";

export default function CardWithForm() {
  const [post, setPost] = useState("");
  const [title, setTitle] = useState("");
  const [imageBase64, setImageBase64] = useState(""); // To store the base64 image

  const onChange = (content) => setPost(content);

  // Convert selected image to base64
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result); // Store the base64 string
      };
      reader.readAsDataURL(file); // Convert image to base64
    }
  };

  async function handleCreate() {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", post);
      if (imageBase64) {
        formData.append("image", imageBase64); // Send the base64 string
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
    <CurdBlog
      title={title}
      post={post}
      onChange={onChange}
      handleCreate={handleCreate}
      imageBase64={imageBase64}
      setImageBase64={setImageBase64}
      setTitle={setTitle}
      handleImageChange={handleImageChange} // Pass the image handler to CurdBlog
    />
  );
}
