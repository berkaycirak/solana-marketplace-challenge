import { available_chains } from "@/available_chains";
import { HeliusSearchAssetsResponse } from "@/types/helius-search-asset-response";
import axios from "axios";
import { getMintAddressesOfAssets } from "./getMintAddressesOfAssets";
import { fetchAllDigitalAsset } from "@metaplex-foundation/mpl-token-metadata";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { clusterApiUrl } from "@solana/web3.js";
import { getAsset } from "./getAssets";
import { publicKey } from "@metaplex-foundation/umi";

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
  const umi = createUmi(clusterApiUrl("devnet"));
  const mintAddresses: Asset[] = await getMintAddressesOfAssets(address);
  console.log(mintAddresses);
  const data = await fetchAllDigitalAsset(
    umi,
    mintAddresses.map((address) => publicKey(address.mint)),
  );

  console.log();
  const filterDataForCollectionNfts = data.filter((asset) =>
    Object.keys(asset.metadata.collection).includes("value"),
  );

  return filterDataForCollectionNfts;
};

// const filteredAssets = verifiedCollectionAssets.filter((nft) =>
//   Object.keys(nft.metadata.collection).includes("value"),
// );
