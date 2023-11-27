import { PrismaClient, lesson } from "@prisma/client";
import { NextRequest } from "next/server";
const client = new PrismaClient();

export async function GET(req: NextRequest) {
  client.$connect();
  const data = await client.lesson.findMany();
  client.$disconnect();
  return Response.json({ data });
}

export async function PUT(req: NextRequest) {
  client.$connect();
  const data: lesson[] = await new Response(req.body).json();
  for(const itm of data) {
    await client.lesson.update({
      where: { id: itm.id },
      data: { name: itm.name, homework: itm.homework },
    })
  }
  client.$disconnect()
  return Response.json({});
}
