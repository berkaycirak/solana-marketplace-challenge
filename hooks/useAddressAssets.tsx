import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { publicKey } from "@metaplex-foundation/umi";
import {
  fetchAllDigitalAssetByOwner,
  mplTokenMetadata,
} from "@metaplex-foundation/mpl-token-metadata";
import { PublicKey } from "@metaplex-foundation/umi";
import { Mint } from "@metaplex-foundation/mpl-toolbox";
import {
  Metadata,
  MasterEdition,
  Edition,
} from "@metaplex-foundation/mpl-token-metadata";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { clusterApiUrl } from "@solana/web3.js";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { NFTMetadata } from "@/types";
import { fetchAssetsOfAddress } from "@/actions/fetchAssetsOfAddress";
import { toast } from "sonner";

export type DigitalAsset = {
  publicKey: PublicKey;
  mint: Mint;
  metadata: Metadata;
  edition?:
    | ({ isOriginal: true } & MasterEdition)
    | ({ isOriginal: false } & Edition);
};

const useAddressAssets = () => {
  // connected wallet address
  const { publicKey: connectedAddress } = useWallet();

  const fetchAssets = async () => {
    if (connectedAddress) {
      // Fetch assets from on-chain

      try {
        const assets = await fetchAssetsOfAddress({
          address: connectedAddress.toBase58(),
        });

        return assets;
      } catch (error) {
        console.log(error);
        toast.error("There is an error while fetching your NFTs");
      }
    }
  };

  const { data, status, refetch } = useQuery({
    queryFn: fetchAssets,
    queryKey: [`assets_${connectedAddress}`],
    refetchInterval: 20 * 60 * 1000, //20sec
    enabled: !!connectedAddress,
  });

  return { assetInfos: data, status, refetch };
};

export default useAddressAssets;
