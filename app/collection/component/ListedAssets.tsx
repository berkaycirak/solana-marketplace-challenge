"use client";

import React from "react";
import NFT from "@/components/shared/NFT";
import useListedAssets from "@/hooks/useListedAssets";
import { useWallet } from "@solana/wallet-adapter-react";
import ListButton from "@/components/shared/ActionButtons/ListButton";
import { checkOwnership } from "@/utils/checkOwnership";
import DelistButton from "@/components/shared/ActionButtons/DelistButton";

const ListedAssets = () => {
  const { listedAssets, status } = useListedAssets();
  const { publicKey } = useWallet();

  return (
    <div>
      {listedAssets?.map((asset) => {
        const isOwner = checkOwnership(asset.owner, publicKey?.toBase58());

        return (
          <NFT
            button={
              isOwner ? (
                <DelistButton
                  owner={asset.owner}
                  ownerMint={asset.mintAddress}
                />
              ) : (
                <ListButton />
              )
            }
            key={asset.mintAddress}
            {...asset}
          />
        );
      })}
    </div>
  );
};

export default ListedAssets;
