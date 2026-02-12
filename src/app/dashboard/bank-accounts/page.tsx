"use client";
import React, { useEffect, useState, useCallback } from "react";
import { usePlaidLink, PlaidLinkOnSuccess, PlaidLinkOnSuccessMetadata } from "react-plaid-link";
import { InstitutionsGetByIdResponse } from "plaid";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import InstitutionCard from "./institution-card";

export default function BankAccountsPage() {
  const [linkToken, setLinkToken] = useState<null | string>(null);
  const [institutions, setInstitutions] = useState<null | InstitutionsGetByIdResponse[]>(null);

  const { open, exit, ready } = usePlaidLink({
    onSuccess: useCallback<PlaidLinkOnSuccess>(async (public_token: string, _metadata: PlaidLinkOnSuccessMetadata) => {
      const response = await fetch(`/api/plaid/exchange-public-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ publicToken: public_token }),
      });
      const { error, message }: { error: boolean; message: string } = await response.json();

      if (error) {
        console.error(message);
        return;
      }

      console.log(message);
    }, []),
    // onExit: (err, metadata) => {},
    // onEvent: (eventName, metadata) => {},
    token: linkToken,
  });

  // create link token
  useEffect(() => {
    const createLinkToken = async () => {
      const response = await fetch("/api/plaid/create-link-token");
      const { linkToken } = await response.json();

      setLinkToken(linkToken);
    };

    createLinkToken();
  }, []);

  // fetch institutions
  useEffect(() => {
    const getItems = async () => {
      console.log("Fetching items...");

      const response = await fetch("/api/db/get-institutions");
      const { error, message, institutions }: { error: boolean; message: string; institutions: InstitutionsGetByIdResponse[] } = await response.json();

      if (error) console.error(message);

      if (!institutions.length) return;

      setInstitutions(institutions);
    };

    getItems();
  }, []);

  return (
    <div className="px-4 lg:px-6">
      <Button variant="outline" size="sm" onClick={() => open()} disabled={!ready}>
        <PlusIcon />
        New Bank Account
      </Button>

      <div className="custom-grid custom-grid-cols-4 custom-gap-4">
        {institutions?.map(({ institution: { institution_id, name, logo } }) => {
          return <InstitutionCard key={`institution-card-${institution_id}`} name={name} logoURL={logo} />;
        })}
      </div>
    </div>
  );
}
