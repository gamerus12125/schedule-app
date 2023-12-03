import { PrismaClient } from "prisma/prisma-client";

const client = new PrismaClient()
client.$connect()

export default client