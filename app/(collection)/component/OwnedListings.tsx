"use client";

import React from "react";
import NFT from "@/components/shared/NFT";
import useListedAssets from "@/hooks/useListedAssets";
import { useWallet } from "@solana/wallet-adapter-react";
import { checkOwnership } from "@/utils/checkOwnership";
import DelistButton from "@/components/shared/ActionButtons/DelistButton";
import PurchaseButton from "@/components/shared/ActionButtons/PurchaseButton";

const OwnedListings = () => {
  const { connectedAccountListings, status } = useListedAssets();
  console.log(connectedAccountListings);

  const { publicKey } = useWallet();

  return (
    <div className="flex flex-wrap content-start gap-2 sm:gap-6">
      {connectedAccountListings?.map((asset) => {
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

export default OwnedListings;
