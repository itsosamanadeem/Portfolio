"use client"
import { Button } from "@/components/ui/button"
import Typed from 'typed.js';
import React, { useRef, useEffect } from 'react';
import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const el = useRef(null);
  const [topProjects, setToProjects] = useState();
  useEffect(() => {
    const getApi = async () => {
      try {
        const res = await fetch(`/api/project/search`, {
          method: "GET"
        });
        const data = await res.json();

        const filteredProjects = data.filter((project) => project.position !== null);
        setToProjects(filteredProjects);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    };

    getApi();

    const typed = new Typed(el.current, {
      strings: ['Odoo Developer', 'Web Development', 'Software Engineering', 'Python Developer', 'Django Rest Framework', 'Next JS Full Stack Developer'],
      typeSpeed: 50,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <main>
      <section className="container px-4 py-10 mx-auto lg:h-128 lg:space-x-8 lg:flex lg:items-center">
        <div className="w-full text-center lg:text-left lg:w-1/2 lg:-mt-8">
          <h1 className="text-3xl leading-snug text-gray-800 dark:text-gray-200 md:text-4xl">
            Hi, I'm <span className="font-semibold">Osama Nadeem</span>, a passionate <br className="hidden lg:block" /><span className="font-semibold underline decoration-primary"><span ref={el} /></span>
          </h1>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-300">
            I love building scalable web apps, working with modern technologies like <br className="hidden lg:block" /> React, Django, and Docker, and crafting clean, user-centric designs.
          </p>
        </div>
        <div className="w-full mt-4 lg:mt-0 lg:w-1/2">
          <img src="https://www.creative-tim.com/twcomponents/svg/website-designer-bro-purple.svg" alt="tailwind css components" className="w-full h-full max-w-md mx-auto" />
        </div>
      </section>

      <section className="py-12 bg-gray-100 dark:bg-gray-900">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-200">Service Packages</h2>
            <p className="mt-4 text-lg text-gray-500 dark:text-gray-300">Flexible plans tailored for startups, SMEs, and enterprises</p>
          </div>
          <div className="flex flex-wrap justify-center">
            {/* Starter Plan */}
            <div className="w-full sm:w-1/2 lg:w-1/3 p-4">
              <div className="p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800 transform transition duration-500 hover:scale-105 text-center">
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Starter</h3>
                <p className="mt-4 text-gray-500 dark:text-gray-300">$299/project</p>
                <ul className="mt-6 mb-6 space-y-4">
                  <li className="text-gray-600 dark:text-gray-400">Static Portfolio Website</li>
                  <li className="text-gray-600 dark:text-gray-400">Responsive Design</li>
                  <li className="text-gray-600 dark:text-gray-400">Basic SEO Optimization</li>
                  <li className="text-gray-600 dark:text-gray-400">2 Revisions</li>
                  <li className="text-gray-600 dark:text-gray-400">Delivery in 7 Days</li>
                </ul>
                <Button className="mx-1" variant="outline">Choose Plan</Button>
              </div>
            </div>

            {/* Professional Plan */}
            <div className="w-full sm:w-1/2 lg:w-1/3 p-4">
              <div className="p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800 transform transition duration-500 hover:scale-105 text-center border-2 border-purple-500">
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Professional</h3>
                <p className="mt-4 text-gray-500 dark:text-gray-300">$699/project</p>
                <span className="inline-block px-3 py-1 text-sm font-semibold text-white bg-purple-500 rounded-full">Most Popular</span>
                <ul className="mt-6 mb-6 space-y-4">
                  <li className="text-gray-600 dark:text-gray-400">Full-Stack Web App (React + Django)</li>
                  <li className="text-gray-600 dark:text-gray-400">Custom UI/UX Integration</li>
                  <li className="text-gray-600 dark:text-gray-400">API Integrations</li>
                  <li className="text-gray-600 dark:text-gray-400">Odoo Community Setup</li>
                  <li className="text-gray-600 dark:text-gray-400">3 Months Support</li>
                </ul>
                <Button className="mx-1" variant="outline">Choose Plan</Button>
              </div>
            </div>

            {/* Enterprise Plan */}
            <div className="w-full sm:w-1/2 lg:w-1/3 p-4">
              <div className="p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800 transform transition duration-500 hover:scale-105 text-center">
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Enterprise</h3>
                <p className="mt-4 text-gray-500 dark:text-gray-300">Starting from $1499</p>
                <ul className="mt-6 mb-6 space-y-4">
                  <li className="text-gray-600 dark:text-gray-400">End-to-End Odoo Implementation</li>
                  <li className="text-gray-600 dark:text-gray-400">Custom Module Development</li>
                  <li className="text-gray-600 dark:text-gray-400">Server Setup (Docker + Nginx)</li>
                  <li className="text-gray-600 dark:text-gray-400">ERP Integration & Training</li>
                  <li className="text-gray-600 dark:text-gray-400">6 Months Dedicated Support</li>
                </ul>
                <Button className="mx-1" variant="outline">Choose Plan</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-200">Top Projects</h2>
            <p className="mt-4 text-lg text-gray-500 dark:text-gray-300">Check out our most popular project posts</p>
          </div>
          <div className="flex flex-wrap justify-center">
            {topProjects && topProjects.length > 0 ? (
              topProjects.map((project, index) => (
                <div key={index} className="w-full sm:w-1/2 lg:w-1/3 p-4">
                  <div className="h-full flex flex-col justify-between bg-white rounded-lg shadow-lg dark:bg-gray-800 transform transition duration-500 hover:scale-105">
                    <img
                      src={project.thumbnail}
                      className="w-full h-48 object-cover rounded-t-lg"
                      alt={project.title}
                    />
                    <div className="p-6 flex flex-col justify-between flex-grow">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                          {project.title}
                        </h3>
                        <p
                          className="mt-2 text-gray-600 dark:text-gray-400 line-clamp-4"
                          dangerouslySetInnerHTML={{ __html: project.content }}
                        />
                      </div>
                      <div className="mt-4">
                        <Link
                          className="m-2"
                          href={`/projectpost/${project.id}`}
                        >
                          Read More
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

              ))
            ) : (
              <p className="text-gray-600 dark:text-gray-400">No projects found.</p>
            )}
          </div>
        </div>
      </section>

    </main>
  );
};








