import { NextResponse, NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getItem, getInstitution } from "@/lib/plaid";

const GET = async (request: NextRequest) => {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: true, message: "Unauthorized" }, { status: 401 });

  const userId = session.user.id;

  const accessTokens = await prisma.item.findMany({
    where: {
      userId: {
        equals: userId,
      },
    },
    select: {
      accessToken: true,
    },
  });

  const institutions = await Promise.all(
    accessTokens.map(async ({ accessToken }) => {
      console.log("Fetching items from plaid...");

      const {
        item: { institution_id },
      } = await getItem(accessToken);
      if (!institution_id) return NextResponse.json({ error: true, message: "Missing institution ID" }, { status: 400 });

      return await getInstitution(institution_id);
    })
  );

  return NextResponse.json({ error: false, message: "Institutions successfully fetched", institutions });
};

export { GET };
