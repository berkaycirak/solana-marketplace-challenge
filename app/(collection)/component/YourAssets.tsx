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
import ListButton from "@/components/shared/ActionButtons/ListButton";
import NFT from "@/components/shared/NFT";
import PurchaseButton from "@/components/shared/ActionButtons/PurchaseButton";

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

  return (
    <div className="p-12">
      {assetInfos?.map((asset) => {
        const nft_mint_address = asset.id;
        // not sure if the grouping same with collection
        const collection_address = asset.grouping[0].group_value;

        const name = asset.content.metadata.name;
        const image = asset.content.links.image;
        const description = asset.content.metadata.description;
        return (
          <div key={asset.id}>
            <div>
              <h5 className="font-bold">{asset.content.metadata.name}</h5>
              <p>{description}</p>
            </div>

            <NFT
              description={description}
              image={image}
              mintAddress={nft_mint_address}
              name={name}
              price={0}
              button={
                <ListButton
                  nftMintAddress={nft_mint_address}
                  collectionAddress={collection_address}
                />
              }
            />
          </div>
        );
      })}
    </div>
  );
};

export default YourAssets;
