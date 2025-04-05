import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request) {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('search')
    if (query) {
      const projects = await prisma.project.findMany({
        where: {
          title: {
            contains: query || '',
          },
        },
      });
      return NextResponse.json(projects, { status: 200 });
    } else {
      const projects = await prisma.project.findMany();
      return NextResponse.json(projects, { status: 200 });
    }

  } catch (error) {
    console.log(error);

    return NextResponse.json({ error: error }, { status: 500 });
  }
}
