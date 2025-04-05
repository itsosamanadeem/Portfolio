
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";


const prisma = new PrismaClient();
export async function GET(req, { params }) {
  try {
    const id =await params.id
    console.log(id);
    

    const project = await prisma.project.findUnique({
      where: { id:id },
    });

    return NextResponse.json(project, { status: 200 });
  } catch (error) {
    console.error("Error fetching project:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}


export async function PUT(req, { params }) {
  try {
    const id = params.id; 
    const { title, post, imageBase64, position } = await req.json();

    const updatedProject = await prisma.project.update({
      where: { id },
      data: {
        title:title,
        content:post,
        thumbnail: imageBase64,
        position: position ? parseInt(position) : null,
      },
    });

    return NextResponse.json(updatedProject, { status: 200 });
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}



export async function DELETE(req, { params }) {
  try {
    const id = params.id;

    await prisma.project.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Project deleted successfully." }, { status: 200 });
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}