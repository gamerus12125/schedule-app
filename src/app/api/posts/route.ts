import { NextRequest } from "next/server";
import { PrismaClient, post} from "prisma/prisma-client";
const client = new PrismaClient
client.$connect()
export async function GET(req:NextRequest) {
    const posts = await client.post.findMany()
    return Response.json({data: posts})
}

export async function POST(req:NextRequest) {
    const data: post = await new Response(req.body).json()
    await client.post.create({data: {title: data.title, text: data.text, username: data.username}})
    return Response.json({status: 200})
}