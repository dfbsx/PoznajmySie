import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { city: string; uni: string } }
) {
  try {
    const { city, uni } = params;

    if (!city || !uni) {
      return NextResponse.json(
        { status: "fail", message: "City and university are required" },
        { status: 400 }
      );
    }

    console.log(`Fetching majors for university: ${uni} in city: ${city}`);

    const major = await prisma.major.findMany({
      where: {
        Uni: { name: uni },
      },
    });

    if (!major.length) {
      return NextResponse.json(
        { status: "fail", message: "No majors found for the given university" },
        { status: 404 }
      );
    }

    return NextResponse.json({ status: "success", major });
  } catch (error: any) {
    console.error("Error in GET /api/cities/[city]/[uni]:", error);
    return NextResponse.json(
      { status: "error", message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const json = await request.json();

    if (!json.Uni?.trim() || !json.name?.trim()) {
      return NextResponse.json(
        { status: "fail", message: "Invalid input. City and university name are required." },
        { status: 400 }
      );
    }

    console.log("Creating or updating university:", json.Uni);

    const uni = await prisma.uni.upsert({
      where: { name: json.Uni },
      create: { name: json.Uni },
      update: { name: json.Uni },
    });

    console.log("Creating major:", json.name);

    const major = await prisma.major.create({
      data: {
        name: json.name,
        Uni: {
          connect: { id: uni.id },
        },
      },
    });

    return NextResponse.json(
      { status: "success", major },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error in POST /api/cities/[city]/[uni]:", error);

    if (error.code === "P2002") {
      return NextResponse.json(
        { status: "fail", message: "A university with the same name already exists" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { status: "error", message: "Internal server error" },
      { status: 500 }
    );
  }
}
