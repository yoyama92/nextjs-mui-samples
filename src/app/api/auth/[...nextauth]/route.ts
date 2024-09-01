import { authConfig } from "@/libs/auth";
import NextAuth from "next-auth";
import type { NextRequest } from "next/server";

export async function GET(request: Request, { ...nextAuth }) {
  return await NextAuth(authConfig)(request, { ...nextAuth });
}

export async function POST(request: NextRequest, { ...nextAuth }) {
  return await NextAuth(authConfig)(request, { ...nextAuth });
}
