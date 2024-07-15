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

const OwnedRabidos = () => {
  const { assetInfos, status, refetch } = useAddressAssets();

  return (
    <div className="flex flex-wrap content-start gap-2 sm:gap-6">
      {assetInfos?.length === 0 && "There is no NFT Yet!"}
      {assetInfos?.map((asset) => {
        return (
          <div key={asset.publicKey} className="flex flex-wrap">
            <NFT
              mintAddress={asset.mint.publicKey}
              description={"Description"}
              image={asset.metadata.uri}
              name={asset.metadata.name}
              button={
                <ListButton
                  refetch={refetch}
                  nftMintAddress={asset.mint.publicKey}
                  // @ts-ignore
                  collectionAddress={asset.metadata.collection.value.key}
                />
              }
            />
          </div>
        );
      })}
    </div>
  );
};

export default OwnedRabidos;
