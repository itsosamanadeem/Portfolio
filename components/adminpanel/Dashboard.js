"use client";
import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";

export default function SearchBar() {
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
    <div className="relative w-full max-w-md mx-auto mt-8">
      <div className="flex items-center border rounded-full px-4 py-2 shadow-md">
        <Search className="w-5 h-5" />
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Search by title..."
          className="flex-1 outline-none px-2"
        />
        {query && (
          <X className="w-5 h-5 cursor-pointer" onClick={clearSearch} />
        )}
      </div>
      {filteredBlogs.length > 0 && (
        <ul className="absolute left-0 right-0 mt-2 border rounded-md shadow-lg overflow-hidden">
          {filteredBlogs.map((blog, index) => (
            <li
              key={index}
              className="px-4 py-2 cursor-pointer "
              onClick={() => setQuery(blog.title)} 
            >
              {blog.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
