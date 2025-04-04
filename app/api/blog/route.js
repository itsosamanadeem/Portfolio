import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { title, content } = await req.json();
    const newBlog = await prisma.blog.create({
      data: { title, content },
    });
    return NextResponse.json(newBlog, { status: 201 });
  } catch (error) {
    console.log(error);

    return NextResponse.json({ error: "Failed to create blog" }, { status: 500 });
  }
}
