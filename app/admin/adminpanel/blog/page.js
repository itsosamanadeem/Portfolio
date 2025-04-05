"use client";
import Blog from "@/components/adminpanel/Blog";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function BlogListView() {
    const [query, setQuery] = useState("");
    const [ID, setID] = useState("");
    const route = useRouter();
    const [filteredBlogs, setFilteredBlogs] = useState([]);


    function moveto() {
        if (ID) {
            route.push(`/admin/adminpanel/blog/edit/${ID}`);
        }
    }

    useEffect(() => {
        if (ID) {
            moveto();
        }
    }, [ID]);
    const handleDelete = async (id) => {

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
            window.location.reload();
        } catch (error) {
            console.error("Error deleting blog:", error);
        }
    }
    useEffect(() => {
        const fetchBlogs = async () => {
            if (query) {
                try {
                    const response = await fetch(`/api/blog/search?search=${query}`);
                    if (!response.ok) {
                        console.error("Failed to fetch data:", response.status, response.statusText);
                        return;
                    }
                    const data = await response.json();
                    if (Array.isArray(data)) {
                        setFilteredBlogs(data);
                    } else {
                        console.error("Invalid response format, expected array:", data);
                        setFilteredBlogs([]);
                    }
                } catch (error) {
                    console.error("Error fetching blogs:", error);
                }
            } else {
                try {
                    const response = await fetch('/api/blog/search');
                    const data = await response.json();
                    setFilteredBlogs(data);
                } catch (error) {
                    console.error("Error fetching blogs:", error);
                }
            }
        };

        fetchBlogs();
    }, [query]);

    const handleSearch = (e) => {
        const value = e.target.value;
        setQuery(value);
    };

    const clearSearch = () => {
        setQuery("");
        setFilteredBlogs([]);
    };

    const handleCreate = () => {
        route.push('/admin/adminpanel/blog/create')
    }

    return (
        <>
            <Blog
                filteredBlogs={filteredBlogs}
                clearSearch={clearSearch}
                handleSearch={handleSearch}
                query={query}
                setID={setID}
                handleDelete={handleDelete}
                setQuery={setQuery}
                handleCreate={handleCreate}
            />
        </>
    );
}
