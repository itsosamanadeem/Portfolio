"use client"

import React from 'react';  
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { useState } from 'react';
import { useEffect } from 'react';
import Image from 'next/image';

const Project = () => {
  const [projects,setprojects]= useState([]);
  
  useEffect(()=>{
    try {
      const projectFunc = async ()=>{
        const getprojects= await fetch('/api/project/search')
        const fetchprojects = await getprojects.json()

        console.log(fetchprojects);
        
        setprojects(fetchprojects)
      }
      projectFunc()
    } catch (error) {
      console.log(error);
    }
  },[])
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Project</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <div key={index} className="rounded-lg shadow-md overflow-hidden  dark:border-2">
            <Image src={project.thumbnail} alt={project.title} width={100} height={100} className="w-full h-64 object-cover" />
            
            <div className="p-4">
              <h2 className="text-2xl font-bold mb-2">{project.title}</h2>
              
              <p className=" mb-4 line-clamp-3" dangerouslySetInnerHTML={{__html: project.content}}/>
              
              <div className="text-sm  mb-4">
                <span>{new Date(project.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}</span> 
              </div>
              
              <Link href={`/projectpost/${project.id}`} className={buttonVariants({ variant: "outline" })}>Click here</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Project;