"use client";
import React, { useEffect, useState } from "react";
import { PublicKey } from "@metaplex-foundation/umi";

import { Mint } from "@metaplex-foundation/mpl-toolbox";
import {
  Metadata,
  MasterEdition,
  Edition,
} from "@metaplex-foundation/mpl-token-metadata";

import Image from "next/image";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Button } from "@/components/ui/button";
import useAddressAssets from "@/hooks/useAddressAssets";

import { toast } from "sonner";
import { nft_list } from "@/anchor-marketplace/program-methods/list";
import useProgram from "@/hooks/useProgram";
import { PublicKey as PK } from "@solana/web3.js";

export type DigitalAsset = {
  publicKey: PublicKey;
  mint: Mint;
  metadata: Metadata;
  edition?:
    | ({ isOriginal: true } & MasterEdition)
    | ({ isOriginal: false } & Edition);
};

const YourAssets = () => {
  const { assetInfos, status } = useAddressAssets();
  const { connection } = useConnection();
  const { publicKey: signerPublicKey, sendTransaction } = useWallet();
  const program = useProgram();

  // List click logic
  const handleList = async (
    nftMintAddress: string,
    collectionAddress: string,
    price: number,
  ) => {
    if (program && signerPublicKey) {
      // Take the promise then pass it to toaster for user feedback on UI
      const listNftPromise = nft_list({
        program,
        signer: signerPublicKey,
        collectionMint: new PK(collectionAddress),
        makerMint: new PK(nftMintAddress),
        price,
      });
      try {
        toast.promise(listNftPromise, {
          loading: "NFT is listing...",
          success: async (data) => {
            console.log(data);
            if (data) {
              await sendTransaction(data, connection);
              return `${!data ? "An error occured" : "Successful, you have listed your NFT"}`;
            }
          },
          error: "An error occured!",
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="p-12">
      {assetInfos?.map((asset) => {
        const nft_mint_address = asset.id;
        // not sure if the grouping same with collection
        const collection_address = asset.grouping[0].group_value;
        console.log(collection_address);
        const name = asset.content.metadata.name;
        const image = asset.content.links.image;
        const description = asset.content.metadata.description;
        return (
          <div key={asset.id}>
            <div>
              <h5 className="font-bold">{asset.content.metadata.name}</h5>
              <p>{description}</p>
            </div>

            <Image
              src={image}
              alt={name}
              height={300}
              width={300}
              className="rounded-lg"
            />
            <Button
              onClick={() =>
                handleList(nft_mint_address, collection_address, 10)
              }
            >
              List
            </Button>
          </div>
        );
      })}
    </div>
  );
};

export default YourAssets;
