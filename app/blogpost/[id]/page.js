"use client"

import OnThisPage from "@/components/onthispage";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function BlogContent() {
    const params = useParams();
    const id = params.id;

    const [data, setData] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        const getWholeBlog = async () => {
            try {
                const res = await fetch(`/api/blog/put/${id}`);
                if (!res.ok) throw new Error("Failed to fetch blog");
                const blog = await res.json();
                setData(blog);
            } catch (err) {
                console.error(err);
                setError(true);
            }
        };

        if (id) getWholeBlog();
    }, [id]);

    if (error) return <div className="p-4 text-red-500">Blog not found.</div>;
    if (!data) return <div className="p-4">Loading...</div>;

    return (
        <div className="max-w-6xl mx-auto p-4">
            <h1 className="text-4xl font-bold mb-4">{data.title}</h1>
            <div className="flex gap-2">
                <p className="text-sm text-gray-500 mb-4">{data.createAt}</p>
            </div>
            <div dangerouslySetInnerHTML={{ __html: data.content }} className="prose dark:prose-invert"></div>
            <OnThisPage htmlContent={data.content} />
        </div>
    );
}
