import { Configuration, PlaidApi, PlaidEnvironments } from "plaid";
import { LinkTokenCreateRequest, CountryCode, Products } from "plaid";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const { PLAID_CLIENT_ID, PLAID_SANDBOX_SECRET } = process.env;
console.log(PlaidEnvironments.sandbox);
const plaidConfig = new Configuration({
  basePath: PlaidEnvironments.sandbox,
  baseOptions: {
    headers: {
      "PLAID-CLIENT-ID": PLAID_CLIENT_ID,
      "PLAID-SECRET": PLAID_SANDBOX_SECRET,
    },
  },
});
const plaidClient = new PlaidApi(plaidConfig);

const GET = async (request: NextRequest) => {
  try {
    const response = await plaidClient.linkTokenCreate({
      user: {
        client_user_id: "dummy-user-123",
        phone_number: "415-555-0010",
      },
      client_name: "Pennywise",
      country_codes: [CountryCode.Us],
      products: [Products.Transactions],
      language: "en",
      // webhook: "https://sample-web-hook.com",
      redirect_uri: "http://localhost:3000/dashboard/bank-accounts",
    });
    const linkToken = response.data.link_token;

    console.log(linkToken);
    return NextResponse.json({ message: "success", linkToken });
  } catch (error: any) {
    console.error(error.response?.data);

    return NextResponse.json({ error: true });
  }
};

export { GET };
