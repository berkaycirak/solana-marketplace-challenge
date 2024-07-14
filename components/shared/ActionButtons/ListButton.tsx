import { nft_list } from "@/anchor-marketplace/program-methods/list";
import { Button } from "@/components/ui/button";
import useProgram from "@/hooks/useProgram";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import React from "react";
import { toast } from "sonner";

interface ListButtonProps {
  collectionAddress: string;
  nftMintAddress: string;
}

const ListButton = ({ collectionAddress, nftMintAddress }: ListButtonProps) => {
  const { connection } = useConnection();
  const program = useProgram();
  const { publicKey: signerPublicKey, sendTransaction } = useWallet();
  // List click logic
  const handleList = async (price: number) => {
    if (program && signerPublicKey) {
      // Take the promise then pass it to toaster for user feedback on UI
      const listNftPromise = nft_list({
        program,
        signer: signerPublicKey,
        collectionMint: new PublicKey(collectionAddress),
        makerMint: new PublicKey(nftMintAddress),
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

  return <Button onClick={() => handleList(10)}>List</Button>;
};

export default ListButton;
