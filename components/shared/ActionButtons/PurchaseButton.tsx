import { nft_list } from "@/anchor-marketplace/program-methods/list";
import { purchase_nft } from "@/anchor-marketplace/program-methods/purchase";
import { Button } from "@/components/ui/button";
import useProgram from "@/hooks/useProgram";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Keypair, PublicKey } from "@solana/web3.js";
import React from "react";
import { toast } from "sonner";

interface PurchaseButtonProps {
  sellerMintAddress: string;
  sellerWalletAddress: string;
}

const PurchaseButton = ({
  sellerMintAddress,
  sellerWalletAddress,
}: PurchaseButtonProps) => {
  const { connection } = useConnection();
  const program = useProgram();
  const { publicKey: signerPublicKey, sendTransaction } = useWallet();
  // List click logic
  const handleBuy = async (e: any) => {
    e.stopPropagation();
    if (program && signerPublicKey) {
      // Take the promise then pass it to toaster for user feedback on UI
      const purchaseNftPromise = purchase_nft({
        program,
        signer: signerPublicKey,
        sellerMint: new PublicKey(sellerMintAddress),
        seller: new PublicKey(sellerWalletAddress),
      });
      try {
        toast.promise(purchaseNftPromise, {
          loading: "Buying NFT...",
          success: async (data) => {
            console.log(data);
            if (data) {
              const signature = await sendTransaction(data, connection);
              console.log(signature);
              return `${!data ? "An error occured" : "Successful, you have bought your NFT"}`;
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
    <Button className="w-full" onClick={(e) => handleBuy(e)}>
      Buy
    </Button>
  );
};

export default PurchaseButton;
