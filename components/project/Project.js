import { Search, X } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";

export default function ProjectComponent({ filteredproject, clearSearch, handleSearch, query, setID, handleDelete, setQuery, handleCreate }) {

    return (
        <>
            <div className="relative w-full mx-auto mt-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 mr-8">

                    <div className="flex items-center border rounded-full px-4 py-2 shadow-md max-w-md w-full">
                        <Search className="w-5 h-5 " />
                        <input
                            type="text"
                            value={query}
                            onChange={handleSearch}
                            placeholder="Search by title..."
                            className="flex-1 outline-none  px-2 text-sm"
                        />
                        {query && (
                            <X className="w-5 h-5  cursor-pointer" onClick={clearSearch} />
                        )}
                    </div>
                    <Button onClick={handleCreate} className="text-sm">
                        + Create project
                    </Button>
                </div>
                {filteredproject?.length > 0 || query && (
                    <ul className="absolute left-0 right-0 mt-2 border rounded-md shadow-lg overflow-hidden">
                        {filteredproject.map((project, index) => (
                            <li
                                key={index}
                                className="px-4 py-2 cursor-pointer "
                                onClick={() => setQuery(project.title)}
                            >
                                {project.title}
                            </li>
                        ))}
                    </ul>
                )}
                <div className="grid gap-6 mt-16 sm:grid-cols-1 md:grid-cols-2 mr-8">
                    {filteredproject.map((project, index) => (
                        <Card key={index} className="flex flex-col sm:flex-row overflow-hidden shadow-lg">
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
                                    <CardTitle className="text-lg line-clamp-1">Top : {project.position}</CardTitle>
                                </CardHeader>
                                <CardContent className="p-0 mt-2">
                                    <CardDescription
                                        className="text-sm text-muted-foreground line-clamp-3"
                                        dangerouslySetInnerHTML={{ __html: project.content }}
                                    />
                                </CardContent>
                                <CardFooter className="flex gap-2 mt-4 p-0">
                                    <Button
                                        onClick={() => setID(project.id)}
                                        className="text-sm"
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        onClick={() => handleDelete(project.id)}
                                        variant="destructive"
                                        className="text-sm"
                                    >
                                        Delete
                                    </Button>
                                </CardFooter>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </>
    );
}
