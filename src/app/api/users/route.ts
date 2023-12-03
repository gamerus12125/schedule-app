import { NextRequest } from "next/server";
import {user } from "@prisma/client";
import client from "@/utils/client";
export async function POST(req: NextRequest) {
  const user: user = await new Response(req.body).json();
  const users = await client.user.findMany()
  if (!users.find((itm) => itm.mail === user.mail && itm.name === user.name)) {
  await client.user.create({
    data: { name: user.name, mail: user.mail, password: user.password },
  });
}
  return Response.json({status: 200});
}
