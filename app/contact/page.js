"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"; 
import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    alert('Form submitted successfully!');
  };

  return (
    <section className="py-16">
      <div className="container px-6 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-semibold">Get In Touch</h2>
          <p className="mt-4 text-lg">We'd love to hear from you! Fill out the form below to get in touch.</p>
        </div>

        <div className="max-w-4xl mx-auto p-8 shadow-lg rounded-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:space-x-4">
              {/* Name Field */}
              <div className="flex-1">
                <label htmlFor="name" className="text-lg">Full Name</label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              {/* Email Field */}
              <div className="flex-1 mt-4 sm:mt-0">
                <label htmlFor="email" className="text-lg">Email Address</label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Message Field */}
            <div>
              <label htmlFor="message" className="text-lg">Message</label>
              <Textarea
                id="message"
                name="message"
                rows="6"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            {/* Submit Button */}
            <div>
              <Button className="w-full py-3 px-6" type="submit">
                Send Message
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
