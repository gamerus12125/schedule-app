import client from "@/utils/client";
import { lesson } from "@prisma/client";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const data = await client.lesson.findMany();
  return Response.json({data}, {status: 200});
}

export async function PUT(req: NextRequest) {
  const data: lesson[] = await new Response(req.body).json();
  for (const itm of data) {
    await client.lesson.update({
      where: { id: itm.id },
      data: { name: itm.name, homework: itm.homework },
    });
  }
  return Response.json({});
}

export async function POST(req: NextRequest) {
  const data: lesson = await new Response(req.body).json();
  await client.lesson.create({
    data: { day: data.day, homework: data.homework ? data.homework : "", name: data.name },
  });
  return Response.json({});
}

export async function DELETE(req: NextRequest) {
  client.$connect();
  const day = await new Response(req.body).json()
  await client.lesson.deleteMany({where: {day: day}})
  client.$disconnect()
  return Response.json({})
}
