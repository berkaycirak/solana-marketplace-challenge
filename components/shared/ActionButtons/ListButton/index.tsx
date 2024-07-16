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
import React, { ElementRef, useRef, useState } from "react";
import { toast } from "sonner";
import { Minus, Plus } from "lucide-react";
import ListPriceInput from "./ListPriceInput";

interface ListButtonProps {
  collectionAddress: string;
  nftMintAddress: string;
  refetch: any;
}

const ListButton = ({
  collectionAddress,
  nftMintAddress,
  refetch,
}: ListButtonProps) => {
  const { connection } = useConnection();
  const [isInputActive, setIsInputActive] = useState(false);
  const program = useProgram();
  const { publicKey: signerPublicKey, sendTransaction } = useWallet();

  // List click logic
  const handleList = async (e: MouseEvent, price: number) => {
    e.stopPropagation();
    setIsInputActive(true);
    if (program && signerPublicKey) {
      // Take the promise then pass it to toaster for user feedback on UI

      try {
        const listPromise = nft_list({
          program,
          signer: signerPublicKey,
          collectionMint: new PublicKey(collectionAddress),
          makerMint: new PublicKey(nftMintAddress),
          // TODO:get the price from user
          price,
        });

        toast.promise(listPromise, {
          loading: "Listing your NFT...",
          success: async (data) => {
            if (data) {
              const signature = await sendTransaction(data, connection);
              refetch();
              console.log(signature);
              return "You have listed your NFT!";
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
    <div
      className="flex h-[50px] w-full items-center justify-center rounded-md bg-primary text-white"
      onClick={(e) => {
        e.stopPropagation();
        setIsInputActive(true);
      }}
    >
      {isInputActive ? (
        <ListPriceInput
          setListInput={setIsInputActive}
          handleList={handleList}
        />
      ) : (
        <span className="flex h-full w-full items-center justify-center transition hover:bg-primary-foreground/10">
          List
        </span>
      )}
    </div>
    // <Drawer>
    //   <DrawerTrigger asChild>
    //     <Button className="w-full">List</Button>
    //   </DrawerTrigger>
    //   <DrawerContent>
    //     <DrawerHeader>
    //       <DrawerTitle>List your NFT</DrawerTitle>
    //       <DrawerDescription>
    //         You can list your NFT by paying and confirming from your adapted
    //         wallet.
    //         <div className="flex items-center justify-center space-x-2">
    //           <Button
    //             variant="outline"
    //             size="icon"
    //             className="h-8 w-8 shrink-0 rounded-full"
    //             onClick={() => handleList(listPrice)}
    //             disabled={listPrice <= 0}
    //           >
    //             <Minus className="h-4 w-4" />
    //             <span className="sr-only">Decrease</span>
    //           </Button>
    //           <div className="flex-1 text-center">
    //             <div className="text-7xl font-bold tracking-tighter">
    //               <span className="" ref={listPriceRef}>
    //                 {listPrice}
    //               </span>
    //             </div>
    //             <div className="text-[0.70rem] uppercase text-muted-foreground"></div>
    //           </div>
    //           <Button
    //             variant="outline"
    //             size="icon"
    //             className="h-8 w-8 shrink-0 rounded-full"
    //             onClick={() => setListPrice((prev) => prev + 1)}
    //           >
    //             <Plus className="h-4 w-4" />
    //             <span className="sr-only">Increase</span>
    //           </Button>
    //         </div>
    //       </DrawerDescription>
    //     </DrawerHeader>
    //     <DrawerFooter>
    //       <Button>List</Button>
    //       <DrawerClose>
    //         <Button className="w-full" variant="outline">
    //           Cancel
    //         </Button>
    //       </DrawerClose>
    //     </DrawerFooter>
    //   </DrawerContent>
    // </Drawer>
  );
};

export default ListButton;
