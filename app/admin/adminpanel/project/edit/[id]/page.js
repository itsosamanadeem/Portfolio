'use client';

import { useState } from "react";
import CurdBlog from "@/components/adminpanel/CreateBlog";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import UpdateDeleteBlog from "@/components/adminpanel/UpdateDeleteBlog";
import { useEffect } from "react";
import UpdateDeleteProject from "@/components/project/UpdateDeleteProject";

export default function EditProject() {
  const [post, setPost] = useState("");
  const [title, setTitle] = useState("");
  const [imageBase64, setImageBase64] = useState(""); 
  const [position, setPosition] = useState(null); 
  const params = useParams();
  const id = params.id
  const router = useRouter()
  
  const onChange = (content) => setPost(content);

  useEffect(() => {
    async function fetchBlog() {
      try {
        const response = await fetch(`/api/project/put/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch Project");
        }
        const data = await response.json();
        console.log(data.content);
        
        setTitle(data.title);
        setPost(data.content);
        setImageBase64(data.thumbnail);
        setPosition(data.position)
      } catch (error) {
        console.error("Error fetching project:", error);
      }
    }

    if (id) fetchBlog();
  }, [id]);

  async function handleChange() {
    try {
      const response = await fetch(`/api/project/put/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, post, imageBase64 ,position}),  
      });

      if (!response.ok) {
        throw new Error("Failed to update project");
      }

      const updatedData = await response.json();
      console.log("Updated Project:", updatedData);
      alert("Project updated successfully!");
    } catch (error) {
      console.error("Error updating project:", error);
    }
  }

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this project post?")) return;
  
    try {
      const response = await fetch(`/api/project/put/${id}`, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        throw new Error("Failed to delete project");
      }
  
      const result = await response.json();
      console.log(result.message);
      alert("Project deleted successfully!");
      router.push("/admin/adminpanel/project");
    } catch (error) {
      console.error("Error deleting project:", error);
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
    <UpdateDeleteProject
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
      setPosition={setPosition}
      position={position}
    />
  );
}
