
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";


const prisma = new PrismaClient();
export async function GET(req, { params }) {
  try {
    const id =await params.id
    console.log(id);
    

    const blog = await prisma.blog.findUnique({
      where: { id:id },
    });

    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    console.error("Error fetching blog:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}


export async function PUT(req, { params }) {
  try {
    const id = params.id; 
    const { title, post, imageBase64 } = await req.json();

    const updatedBlog = await prisma.blog.update({
      where: { id },
      data: {
        title:title,
        content:post,
        thumbnail: imageBase64,
      },
    });

    return NextResponse.json(updatedBlog, { status: 200 });
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}



export async function DELETE(req, { params }) {
  try {
    const id = params.id;

    await prisma.blog.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Blog deleted successfully." }, { status: 200 });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}