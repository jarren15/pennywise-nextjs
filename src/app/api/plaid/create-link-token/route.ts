import { NextResponse, NextRequest } from "next/server";
import { CountryCode, Products } from "plaid";
import { plaidClient } from "@/lib/plaid";
import { auth } from "@/lib/auth";

const GET = async (request: NextRequest) => {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: true, message: "Unauthorized" }, { status: 401 });

  const response = await plaidClient.linkTokenCreate({
    user: {
      client_user_id: session.user.id,
      phone_number: "415-555-0010",
    },
    client_name: "Pennywise",
    country_codes: [CountryCode.Us],
    products: [Products.Transactions],
    language: "en",
    // webhook: "https://sample-web-hook.com",
    redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/bank-accounts`,
  });

  const { link_token } = response.data;

  return NextResponse.json({ error: false, message: "success", linkToken: link_token });
};

export { GET };
