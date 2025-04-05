"use client"

import React from 'react';  
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
// import fs from "fs";
// import matter from 'gray-matter';
import { useState } from 'react';
import { useEffect } from 'react';
import Image from 'next/image';


// const dirContent = fs.readdirSync("content", "utf-8")

// const blogs = dirContent.map(file=>{
//     const fileContent = fs.readFileSync(`content/${file}`, "utf-8")
//     const {data} = matter(fileContent)
//     return data
// }) 

const Blog = () => {
  const [blogs,setBlogs]= useState([]);
  
  useEffect(()=>{
    try {
      const blogFunc = async ()=>{
        const getblogs= await fetch('/api/blog/search')
        const fetchBlogs = await getblogs.json()

        console.log(fetchBlogs);
        
        setBlogs(fetchBlogs)
      }
      blogFunc()
    } catch (error) {
      console.log(error);
    }
  },[])
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog, index) => (
          <div key={index} className="rounded-lg shadow-md overflow-hidden  dark:border-2">
            <Image src={blog.thumbnail} alt={blog.title} width={100} height={100} className="w-full h-64 object-cover" />
            
            <div className="p-4">
              <h2 className="text-2xl font-bold mb-2">{blog.title}</h2>
              
              <p className=" mb-4 line-clamp-3" dangerouslySetInnerHTML={{__html: blog.content}}/>
              
              <div className="text-sm  mb-4">
                <span>{new Date(blog.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}</span> 
              </div>
              
              <Link href={`/blogpost/${blog.id}`} className={buttonVariants({ variant: "outline" })}>Click here</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Blog;