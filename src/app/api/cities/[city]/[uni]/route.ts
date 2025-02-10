import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { uni: string } }
) {
  const uni = params.uni;
  const major = await prisma.major.findMany({
    where: {
      Uni:{
        name:uni,
      }
    },
  });
  const allMajors = await prisma.major.findMany();

  if (!major) {
    let error_response = {
      status: "fail",
      message: "No uni with the Provided ID Found",
    };
    return new NextResponse(JSON.stringify(error_response), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  let json_response = {
      major,
      allMajors,
  };
  return NextResponse.json(json_response);
}

export async function POST(request: Request) {
  try {
    const json = await request.json();
    if (!json.Uni || !json.name) {
      const errorResponse = {
        status: "fail",
        message: "City name and uni name are required in the input data",
        data: json,
      };
      return new NextResponse(JSON.stringify(errorResponse), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    const uni = await prisma.uni.upsert({
      where: { name: json.Uni},
      create: { name: json.Uni},
      update: { name: json.Uni},
    });
  
    const major = await prisma.major.create({
      data: {
        name: json.name,
        Uni: {
          connect: { id: uni.id },
        },
      },
    });
  
    const successResponse = {
      status: "success",
      major,
    };
    return new NextResponse(JSON.stringify(successResponse), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    if (error.code === "P2002") {
      const errorResponse = {
        status: "fail",
        message: "uni with the same name already exists",
      };
      return new NextResponse(JSON.stringify(errorResponse), {
        status: 409,
        headers: { "Content-Type": "application/json" },
      });
    }
  
    const errorResponse = {
      status: "error",
      message: error.message,
    };
    return new NextResponse(JSON.stringify(errorResponse), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
