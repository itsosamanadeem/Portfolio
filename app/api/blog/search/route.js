import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request) {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('search')
    if (query) {
      const blogs = await prisma.blog.findMany({
        where: {
          title: {
            contains: query || '',
          },
        },
      });
      return NextResponse.json(blogs, { status: 200 });
    } else {
      const blogs = await prisma.blog.findMany();
      return NextResponse.json(blogs, { status: 200 });
    }

  } catch (error) {
    console.log(error);

    return NextResponse.json({ error: error }, { status: 500 });
  }
}
