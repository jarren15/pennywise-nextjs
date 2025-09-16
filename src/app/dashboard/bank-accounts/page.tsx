"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { usePlaidLink, PlaidLinkOptions, PlaidLinkOnSuccess } from "react-plaid-link";

export default function BankAccountsPage() {
  const [linkToken, setLinkToken] = useState(null);
  const { open, exit, ready } = usePlaidLink({
    onSuccess: (public_token, metadata) => {
      console.log(public_token)
    },
    // onExit: (err, metadata) => {},
    // onEvent: (eventName, metadata) => {},
    token: linkToken,
  });

  useEffect(() => {
    const createLinkToken = async () => {
      console.log("fetching token...");
      const response = await fetch("/api/plaid", { method: "GET" });
      const { linkToken } = await response.json();
      setLinkToken(linkToken);
    };
    createLinkToken();
  }, []);

  return (
    <div className="px-4 lg:px-6">
      <Button variant="outline" size="sm" onClick={() => open()} disabled={!ready}>
        <PlusIcon />
        New Bank Account
      </Button>
    </div>
  );
}
