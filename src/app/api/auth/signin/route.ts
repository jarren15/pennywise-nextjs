import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const { email, password }: { email: string; password: string } = await request.json();
    const doesUserExists = await prisma.users.findUnique({
      where: {
        email,
      },
    });

    if (!doesUserExists || !doesUserExists.password_hash) {
      return NextResponse.json({ message: "Invalid credentials", error: true }, { status: 400 });
    }

    const passwordHash = doesUserExists.password_hash;

    const isPasswordMatched = await bcrypt.compare(password, passwordHash);

    if (!isPasswordMatched) {
      return NextResponse.json({ message: "Invalid credentials", error: true }, { status: 400 });
    }

    const userId = Number(doesUserExists.id);

    return NextResponse.json({ message: "Signin success", userId, error: false });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : typeof err === "string" ? err : "Unexpected server error while signing in.";
    return NextResponse.json({ message: errorMessage, error: true }, { status: 500 });
  }
}
