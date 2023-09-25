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
  };
  return NextResponse.json(json_response);
}