import { available_chains } from "@/available_chains";

import axios from "axios";

// This method is the fastest way to lookup multiple NFTs (including metadata) on Solana.
export const getMintAddressesOfAssets = async (address: string) => {
  const tokenAssets = await axios.post(available_chains.devnet.heliusUrl, {
    jsonrpc: "2.0",
    id: "",
    method: "getTokenAccounts",
    params: {
      owner: address,
      page: 1,
      limit: 100,

      options: {
        showZeroBalance: true,
      },
    },
  });

  console.log(tokenAssets.data.result.token_accounts);

  return tokenAssets.data.result.token_accounts;
};
