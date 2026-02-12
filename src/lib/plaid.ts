import { Configuration, PlaidApi, PlaidEnvironments, CountryCode } from "plaid";

const { PLAID_CLIENT_ID, PLAID_SANDBOX_SECRET } = process.env;
const PLAID_SANDBOX_DOMAIN = PlaidEnvironments.sandbox;

const plaidClient = new PlaidApi(
  new Configuration({
    basePath: PLAID_SANDBOX_DOMAIN,
    baseOptions: {
      headers: {
        "PLAID-CLIENT-ID": PLAID_CLIENT_ID,
        "PLAID-SECRET": PLAID_SANDBOX_SECRET,
      },
    },
  })
);

const getItem = async (accessToken: string) => {
  const response = await plaidClient.itemGet({ access_token: accessToken });

  return response.data;
};

const getInstitution = async (institutionId: string) => {
  const response = await plaidClient.institutionsGetById({ institution_id: institutionId, country_codes: [CountryCode.Us], options: { include_optional_metadata: true } });

  return response.data;
};

export { plaidClient, getItem, getInstitution };
