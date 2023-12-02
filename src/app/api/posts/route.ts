import { NextRequest } from "next/server";
import { PrismaClient } from "prisma/prisma-client";
const client = new PrismaClient
client.$connect()
export async function GET(req:NextRequest) {
    const posts = await client.post.findMany()
    return Response.json({data: posts})
}