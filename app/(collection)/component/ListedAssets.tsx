"use client";

import React from "react";
import NFT from "@/components/shared/NFT";
import useListedAssets from "@/hooks/useListedAssets";
import { useWallet } from "@solana/wallet-adapter-react";
import ListButton from "@/components/shared/ActionButtons/ListButton";
import { checkOwnership } from "@/utils/checkOwnership";
import DelistButton from "@/components/shared/ActionButtons/DelistButton";
import PurchaseButton from "@/components/shared/ActionButtons/PurchaseButton";

const ListedAssets = () => {
  const { listedAssets, status } = useListedAssets();
  const { publicKey } = useWallet();

  return (
    <div>
      {listedAssets?.map((asset) => {
        const isOwner = checkOwnership(asset.owner, publicKey?.toBase58());
        // already listed ==> delist

        return (
          <NFT
            button={
              isOwner ? (
                <DelistButton
                  owner={asset.owner}
                  ownerMint={asset.mintAddress}
                />
              ) : (
                <PurchaseButton
                  sellerMintAddress={asset.mintAddress}
                  sellerWalletAddress={asset.owner}
                />
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
