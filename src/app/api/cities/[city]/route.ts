import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { city: string } }
) {
  const city = params.city;
  const feedback = await prisma.uni.findMany({
    where: {
      City:{
        name:city,
      }
    },
  });

  if (!feedback) {
    let error_response = {
      status: "fail",
      message: "No Feedback with the Provided ID Found",
    };
    return new NextResponse(JSON.stringify(error_response), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  let json_response = {
    status: "success",
    data: {
      feedback,
    },
  };
  return NextResponse.json(json_response);
}