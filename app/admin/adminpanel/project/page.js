"use client";
import Blog from "@/components/adminpanel/Blog";
import ProjectComponent from "@/components/project/Project";
import Project from "@/components/project/Project";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function () {
    const [query, setQuery] = useState("");
    const [ID, setID] = useState("");
    const route = useRouter();
    const [filteredproject, setFilteredproject] = useState([]);


    function moveto() {
        if (ID) {
            route.push(`/admin/adminpanel/project/edit/${ID}`);
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
            const response = await fetch(`/api/project/put/${id}`, {
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
        const fetchProjects = async () => {
            if (query) {
                try {
                    const response = await fetch(`/api/project/search?search=${query}`);
                    if (!response.ok) {
                        console.error("Failed to fetch data:", response.status, response.statusText);
                        return;
                    }
                    const data = await response.json();
                    setFilteredproject(data);
                } catch (error) {
                    console.error("Error fetching project:", error);
                }
            } else {
                try {
                    const response = await fetch('/api/project/search');
                    const data = await response.json();
                    setFilteredproject(data);
                } catch (error) {
                    console.error("Error fetching project:", error);
                }
            }
        };

        fetchProjects();
    }, [query]);

    const handleSearch = (e) => {
        const value = e.target.value;
        setQuery(value);
    };

    const clearSearch = () => {
        setQuery("");
        setFilteredproject([]);
    };

    const handleCreate =()=>{
        route.push('/admin/adminpanel/project/create')
    }

    return (
        <>
            <ProjectComponent
                filteredproject={filteredproject}
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
