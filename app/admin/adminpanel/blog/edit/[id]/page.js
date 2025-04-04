'use client';

import { useState } from "react";
import CurdBlog from "@/components/adminpanel/CreateBlog";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import UpdateDeleteBlog from "@/components/adminpanel/UpdateDeleteBlog";
import { useEffect } from "react";

export default function Edit() {
  const [post, setPost] = useState("");
  const [title, setTitle] = useState("");
  const [imageBase64, setImageBase64] = useState(""); 
  const params = useParams();
  const id = params.id
  const router = useRouter()
  
  const onChange = (content) => setPost(content);

  useEffect(() => {
    async function fetchBlog() {
      try {
        const response = await fetch(`/api/blog/put/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch blog");
        }
        const data = await response.json();
        console.log(data.content);
        
        setTitle(data.title);
        setPost(data.content);
        setImageBase64(data.thumbnail);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    }

    if (id) fetchBlog();
  }, [id]);

  async function handleChange() {
    try {
      const response = await fetch(`/api/blog/put/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, post, imageBase64 }),  
      });

      if (!response.ok) {
        throw new Error("Failed to update blog");
      }

      const updatedData = await response.json();
      console.log("Updated Blog:", updatedData);
      alert("Blog updated successfully!");
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  }

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this blog post?")) return;
  
    try {
      const response = await fetch(`/api/blog/put/${id}`, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        throw new Error("Failed to delete blog");
      }
  
      const result = await response.json();
      console.log(result.message);
      alert("Blog deleted successfully!");
      // Optionally redirect:
      router.push("/admin/adminpanel/blog");
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  }
  
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

  return (
    <UpdateDeleteBlog
      title={title}
      post={post}
      onChange={onChange}
      imageBase64={imageBase64}
      setImageBase64={setImageBase64}
      setTitle={setTitle}
      handleImageChange={handleImageChange} 
      id={id}
      handleChange={handleChange}
      handleDelete={handleDelete}
    />
  );
}
