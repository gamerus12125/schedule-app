import { NextResponse } from "next/server";
import { PrismaClient, user } from "@prisma/client";
const client = new PrismaClient();

export async function GET(req: NextResponse) {
  client.$connect();
  const data = await client.user.findMany();
  client.$disconnect();
  return Response.json(data);
}
export async function POST(req: NextResponse) {
  client.$connect();
  const data: user = await new Response(req.body).json();
  await client.user.create({
    data: { name: data.name, mail: data.mail, password: data.password },
  });
  client.$disconnect();
  return Response.json({});
}
