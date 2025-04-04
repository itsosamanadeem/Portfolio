import { Search, X } from "lucide-react";

export default function Dashboard({filteredBlogs,clearSearch,handleSearch,query}) {

    return (
        <>
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
        </>
    );
}
