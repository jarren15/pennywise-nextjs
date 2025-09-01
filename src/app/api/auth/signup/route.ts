import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const { name, email, password }: {name: string, email: string, password: string} = await request.json();
    // email already exists
    const doesUserExists = await prisma.users.findUnique({
      where: {
        email,
      },
    });

    if (doesUserExists) {
      return NextResponse.json({ message: "A user with the same email already exists.", error: true }, { status: 409 });
    }

    // create user
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.users.create({
      data: {
        name,
        email,
        password_hash: passwordHash,
      },
    });

    // create account with no provider
    await prisma.accounts.create({
      data: {
        user_id: user.id,
      },
    });

    return NextResponse.json({ message: "User succesfully created", userId: Number(user.id), error: false });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : typeof err === "string" ? err : "Unexpected server error while creating user.";
    return NextResponse.json({ message: errorMessage, error: true }, { status: 500 });
  }
}
