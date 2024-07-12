import { available_chains } from "@/available_chains";
import { HeliusSearchAssetsResponse } from "@/types/helius-search-assets-response.";
import axios from "axios";

export const fetchAssetsOfAddress = async ({
  address,
}: {
  address: string;
}) => {
  const tokenAssets = await axios.post(available_chains.devnet.heliusUrl, {
    jsonrpc: "2.0",
    id: "",
    method: "searchAssets",
    params: {
      page: 1,
      limit: 100,
      ownerAddress: address,
      tokenType: "nonFungible",
    },
  });

  return tokenAssets.data.result.items as HeliusSearchAssetsResponse;
};
