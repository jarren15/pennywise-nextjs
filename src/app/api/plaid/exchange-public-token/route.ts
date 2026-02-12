import { NextResponse, NextRequest } from "next/server";
import { plaidClient } from "@/lib/plaid";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";

const POST = async (request: NextRequest) => {
  const session = await auth();
  if (!session) return NextResponse.json({ error: true, message: "Unauthorized" }, { status: 401 });

  const { publicToken } = await request.json();
  if (!publicToken) return NextResponse.json({ error: true, message: "Missing public token" }, { status: 400 });

  const response = await plaidClient.itemPublicTokenExchange({ public_token: publicToken });
  const { access_token, item_id, request_id } = response.data;

  const user = await prisma.user.findUnique({
    where: {
      id: session.user?.id ?? undefined,
    },
  });
  if (!user) return NextResponse.json({ error: true, message: "No user found" });

  const item = await prisma.item.create({
    data: {
      itemId: item_id,
      userId: user.id,
      accessToken: access_token,
      requestId: request_id,
    },
  });

  return NextResponse.json(
    {
      error: false,
      message: "Item successfully created",
      item,
    },
    { status: 201 }
  );
};

const GET = async (request: NextRequest) => {
  const session = await auth();
  console.log(session?.user?.id);
  return NextResponse.json({ ok: true });
};

export { GET, POST };
