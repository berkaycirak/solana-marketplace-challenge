import { available_chains } from "@/available_chains";
import { HeliusSearchAssetsResponse } from "@/types/helius-search-asset-response";
import axios from "axios";
import { getMintAddressesOfAssets } from "./getMintAddressesOfAssets";
import { fetchAllDigitalAsset } from "@metaplex-foundation/mpl-token-metadata";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { clusterApiUrl } from "@solana/web3.js";
import { getAsset } from "./getAssets";

interface Asset {
  address: string;
  mint: string;
  owner: string;
  amount: number;
  delegated_amount: number;
  frozen: boolean;
}

export const fetchAssetsOfAddress = async ({
  address,
}: {
  address: string;
}) => {
  const mintAddresses: Asset[] = await getMintAddressesOfAssets(address);
  console.log(mintAddresses);

  const data = await getAsset("H1rRihhRPtAi14TaHTN8RrtXHeK7a6qHq1HRY6zjA7U6");
  console.log(data);
  return [
    {
      name: data.content.metadata.name,
      description: data.content.metadata.description,
      image: data.content.links.image,
      ...data,
    },
  ];
};

// const filteredAssets = verifiedCollectionAssets.filter((nft) =>
//   Object.keys(nft.metadata.collection).includes("value"),
// );
