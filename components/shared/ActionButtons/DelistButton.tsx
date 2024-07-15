import { delist_nft } from "@/anchor-marketplace/program-methods/delist";
import { Button } from "@/components/ui/button";
import useProgram from "@/hooks/useProgram";
import { AnchorMarketplace } from "@/idl/anchor_marketplace";
import { MarketplaceProgram } from "@/types";
import { Program } from "@metaplex-foundation/umi";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import React from "react";
import { toast } from "sonner";
interface DelistButtonProps {
  ownerMint: string;
  owner: string;
  refetch: any;
}
const DelistButton = ({ owner, ownerMint, refetch }: DelistButtonProps) => {
  const program = useProgram();
  const { publicKey: connectedKey, sendTransaction } = useWallet();
  const { connection } = useConnection();
  // Handle delist logic
  const handleDelist = () => {
    if (connectedKey && program) {
      try {
        const delistPromise = delist_nft({
          ownerMint: new PublicKey(ownerMint),
          owner: new PublicKey(owner),
          program,
          signer: connectedKey,
        });

        toast.promise(delistPromise, {
          loading: "Cancelling listing...",
          success: async (data) => {
            if (data) {
              const signature = await sendTransaction(data, connection);
              refetch();
              console.log(signature);
              return "You have cancelled your listing!";
            }
          },
          error: "An error occured",
        });
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <Button className="w-full" onClick={handleDelist}>
      Cancel List
    </Button>
  );
};

export default DelistButton;
