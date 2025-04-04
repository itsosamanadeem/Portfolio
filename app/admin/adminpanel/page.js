"use client"
import Dashboard from "@/components/adminpanel/Dashboard";
import { useState, useEffect } from "react";

export default function () {
    const [query, setQuery] = useState("");
    const [filteredBlogs, setFilteredBlogs] = useState([]);

    useEffect(() => {
        if (query) {
            fetch(`/api/blog/search?search=${query}`)
                .then((response) => {
                    if (!response.ok) {
                        console.error("Failed to fetch data:", response.status, response.statusText);
                        return;
                    }
                    return response.json();
                })
                .then((data) => {
                    if (data) {
                        setFilteredBlogs(data);
                    }
                })
                .catch((error) => {
                    console.error("Error fetching blogs:", error);
                });
        } else {
            setFilteredBlogs([]);
        }
    }, [query]);

    const handleSearch = (e) => {
        const value = e.target.value;
        setQuery(value);
    };

    const clearSearch = () => {
        setQuery("");
        setFilteredBlogs([]);
    };

    return (
        <>
            <Dashboard filteredBlogs={filteredBlogs} clearSearch={clearSearch} handleSearch={handleSearch} query={query}/>
        </>
    );
}