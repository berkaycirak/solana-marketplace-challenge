import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { publicKey } from "@metaplex-foundation/umi";
import { fetchAssetsByOwner, mplCore } from "@metaplex-foundation/mpl-core";
import { useWallet } from "@solana/wallet-adapter-react";
import { clusterApiUrl } from "@solana/web3.js";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { NFTMetadata } from "@/types";

const useAddressAssets = () => {
  // Umi connection
  const umi = createUmi(clusterApiUrl("devnet")).use(mplCore());
  // connected wallet address
  const { publicKey: connectedAddress } = useWallet();

  const fetchAssets = async () => {
    if (connectedAddress) {
      // Fetch assets from on-chain
      const assets = await fetchAssetsByOwner(
        umi,
        publicKey(publicKey(connectedAddress)),
      );
      // Iterate over assets to fetch off-chain data using uri in which metadata is uploaded and combine it with on-chain data.
      const assetInfoPromises = assets.map(async (asset) => {
        const metadata = (await axios.get<NFTMetadata>(asset.uri)).data;

        return {
          ...metadata,
          owner: asset.owner,
          publicKey: asset.publicKey,
        };
      });

      const assetsInfo = await Promise.all(assetInfoPromises);

      return assetsInfo;
    }
  };

  const { data, status } = useQuery({
    queryFn: fetchAssets,
    queryKey: [`assets_${connectedAddress}`],
  });

  return { assetInfos: data, status };
};

export default useAddressAssets;
