"use client";

import React from "react";
import NFT from "@/components/shared/NFT";
import useListedAssets from "@/hooks/useListedAssets";
import { useWallet } from "@solana/wallet-adapter-react";
import { checkOwnership } from "@/utils/checkOwnership";
import DelistButton from "@/components/shared/ActionButtons/DelistButton";
import PurchaseButton from "@/components/shared/ActionButtons/PurchaseButton";
import { bs58 } from "@coral-xyz/anchor/dist/cjs/utils/bytes";

const PRIVATE =
  "466cVVMfthgc12GazPQjoPeq4wW4ePsDYdT8GwUhpHW35vScEGYu3YSA23zyx92H4duCEtiXzukNHQvWs7dJ9KXc";

const ListedAssets = () => {
  const { othersListings, status } = useListedAssets();

  const { publicKey } = useWallet();
  console.log(publicKey);

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
