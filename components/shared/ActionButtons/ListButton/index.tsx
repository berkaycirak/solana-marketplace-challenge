import { nft_list } from "@/anchor-marketplace/program-methods/list";
import { Button } from "@/components/ui/button";
import useProgram from "@/hooks/useProgram";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import React, { useState } from "react";
import { toast } from "sonner";
import ListPriceInput from "./ListPriceInput";
import { Minus, Plus } from "lucide-react";

interface ListButtonProps {
  collectionAddress: string;
  nftMintAddress: string;
}

const ListButton = ({ collectionAddress, nftMintAddress }: ListButtonProps) => {
  const { connection } = useConnection();
  const program = useProgram();
  const { publicKey: signerPublicKey, sendTransaction } = useWallet();
  const [listPrice, setListPrice] = useState<number>(0);

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

  const [goal, setGoal] = React.useState(350);

  function onClick(adjustment: number) {
    setGoal(Math.max(200, Math.min(400, goal + adjustment)));
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Move Goal</DrawerTitle>
            <DrawerDescription>Set your daily activity goal.</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="flex items-center justify-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 shrink-0 rounded-full"
                onClick={() => onClick(-10)}
                disabled={goal <= 200}
              >
                <Minus className="h-4 w-4" />
                <span className="sr-only">Decrease</span>
              </Button>
              <div className="flex-1 text-center">
                <div className="text-7xl font-bold tracking-tighter">
                  {goal}
                </div>
                <div className="text-[0.70rem] uppercase text-muted-foreground">
                  Calories/day
                </div>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 shrink-0 rounded-full"
                onClick={() => onClick(10)}
                disabled={goal >= 400}
              >
                <Plus className="h-4 w-4" />
                <span className="sr-only">Increase</span>
              </Button>
            </div>
          </div>
          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default ListButton;
