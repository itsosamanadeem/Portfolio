"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
const Project = () => {
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [query, setQuery] = useState("");

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
          setFilteredProjects(data);
        } catch (error) {
          console.error("Error fetching project:", error);
        }
      } else {
        try {
          const response = await fetch('/api/project/search');
          const data = await response.json();
          setFilteredProjects(data);
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
    setFilteredProjects([]);
  };


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Projects</h1>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex items-center border rounded-full px-4 py-2 shadow-md max-w-md w-full">
          <Search className="w-5 h-5" />
          <input
            type="text"
            value={query}
            onChange={handleSearch}
            placeholder="Search by title..."
            className="flex-1 outline-none px-2 text-sm"
          />
          {query && (
            <X className="w-5 h-5 cursor-pointer" onClick={clearSearch} />
          )}
        </div>
      </div>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="flex flex-col sm:flex-row overflow-hidden shadow-lg">
            <div className="relative w-full sm:w-40 h-40">
              <Image
                src={project.thumbnail}
                layout="fill"
                objectFit="cover"
                className="rounded-t-lg sm:rounded-none sm:rounded-l-lg"
                alt="thumbnail"
              />
            </div>
            <div className="flex flex-col justify-between flex-1 p-4">
              <CardHeader className="p-0">
                <CardTitle className="text-lg line-clamp-1">{project.title}</CardTitle>
                <CardTitle className="text-lg line-clamp-1">Top: {project.position}</CardTitle>
              </CardHeader>
              <CardContent className="p-0 mt-2">
                <CardDescription
                  className="text-sm text-muted-foreground line-clamp-3"
                  dangerouslySetInnerHTML={{ __html: project.content }}
                />
              </CardContent>
              <div className="mt-4">
                <Link href={`/projectpost/${project.id}`}>
                  <Button variant="outline" className="text-sm">Read More</Button>
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Project;
