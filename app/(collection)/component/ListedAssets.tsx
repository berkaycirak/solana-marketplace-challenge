"use client";

import React from "react";
import NFT from "@/components/shared/NFT";
import useListedAssets from "@/hooks/useListedAssets";
import { useWallet } from "@solana/wallet-adapter-react";
import PurchaseButton from "@/components/shared/ActionButtons/PurchaseButton";

const ListedAssets = () => {
  const { othersListings, status, refetch } = useListedAssets();

  const { publicKey } = useWallet();

  return (
    <div className="flex flex-wrap content-start gap-2 sm:gap-6">
      {othersListings?.length === 0 && "There is no NFT Yet!"}
      {othersListings?.map((asset) => {
        // already listed ==> delist

        return (
          <NFT
            button={
              <PurchaseButton
                sellerMintAddress={asset.mintAddress}
                sellerWalletAddress={asset.owner}
                refetch={refetch}
              />
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
