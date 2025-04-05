import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const formData = await req.formData();
    const title = formData.get("title");
    const content = formData.get("content");
    const base64Image = formData.get("image");
    const position = formData.get("position");

    let imageUrl = base64Image;

    const newProject = await prisma.project.create({
      data: {
        title,
        content,
        thumbnail: imageUrl, 
        position: position ? parseInt(position) : null,
      },
    });

    return NextResponse.json(newProject, { status: 201 });
  } catch (err) {
    console.error("Error creating project:", err);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}
