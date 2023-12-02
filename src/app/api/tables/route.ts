import { PrismaClient, lesson } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
const client = new PrismaClient();

export async function GET(req: NextRequest) {
  client.$connect();
  console.log(await new NextRequest(req).headers)
  const data = await client.lesson.findMany();
  client.$disconnect();
  return Response.json({data}, {status: 200, headers: {
    'Access-Control-Allow-Origin': 'http://localhost:3001',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  }});
}

export async function PUT(req: NextRequest) {
  client.$connect();
  const data: lesson[] = await new Response(req.body).json();
  for (const itm of data) {
    await client.lesson.update({
      where: { id: itm.id },
      data: { name: itm.name, homework: itm.homework },
    });
  }
  client.$disconnect();
  return Response.json({});
}

export async function POST(req: NextRequest) {
  client.$connect();
  const data: lesson = await new Response(req.body).json();
  await client.lesson.create({
    data: { day: data.day, homework: data.homework ? data.homework : "", name: data.name },
  });
  client.$disconnect();
  return Response.json({});
}

export async function DELETE(req: NextRequest) {
  client.$connect();
  const day = await new Response(req.body).json()
  await client.lesson.deleteMany({where: {day: day}})
  client.$disconnect()
  return Response.json({})
}
