import { available_chains } from "@/available_chains";
import { GetAssetResponse } from "@/types/get-asset-response";
import axios from "axios";

// This method is the fastest way to lookup multiple NFTs (including metadata) on Solana.
export const getAsset = async (id: string) => {
  const tokenAssets = await axios.post(available_chains.devnet.heliusUrl, {
    jsonrpc: "2.0",
    id: "",
    method: "getAsset",
    params: {
      id,
      options: {
        showUnverifiedCollections: true,
        showCollectionMetadata: true,
        showFungible: false,
        showInscription: false,
      },
    },
  });

  return tokenAssets.data.result as GetAssetResponse;
};
