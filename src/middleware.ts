export {default} from "next-auth/middleware"
import { NextRequest, NextResponse } from "next/server";


export const config = {matcher: ["/profile", "/api/:path*"]}