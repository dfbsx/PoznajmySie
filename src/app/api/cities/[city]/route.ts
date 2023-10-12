import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { city: string } }
) {
  const city = params.city;
  const uni = await prisma.uni.findMany({
    where: {
      City:{
        name:city,
      }
    },
  });
  const allunis = await prisma.uni.findMany({});

  if (!uni && !allunis) {
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
      uni,
      allunis
  };
  return NextResponse.json(json_response);
}


export async function POST(request: Request) {
  try {
    const json = await request.json();
    if (!json.City || !json.name) {
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
    const city = await prisma.city.upsert({
      where: { name: json.City },
      create: { name: json.City },
      update: { name: json.City },
    });
  
    const uni = await prisma.uni.create({
      data: {
        name: json.name,
        City: {
          connect: { id: city.id },
        },
      },
    });
  
    const successResponse = {
      status: "success",
      uni,
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
