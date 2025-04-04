import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const formData = await req.formData();
    const title = formData.get("title");
    const content = formData.get("content");
    const base64Image = formData.get("image");

    let imageUrl = base64Image;

    const newBlog = await prisma.blog.create({
      data: {
        title,
        content,
        thumbnail: imageUrl, 
      },
    });

    return NextResponse.json(newBlog, { status: 201 });
  } catch (err) {
    console.error("Error creating blog:", err);
    return NextResponse.json(
      { error: "Failed to create blog" },
      { status: 500 }
    );
  }
}
