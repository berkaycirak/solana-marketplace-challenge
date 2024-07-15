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

interface ListButtonProps {
  collectionAddress: string;
  nftMintAddress: string;
}

const ListButton = ({ collectionAddress, nftMintAddress }: ListButtonProps) => {
  const { connection } = useConnection();
  const program = useProgram();
  const { publicKey: signerPublicKey, sendTransaction } = useWallet();
  // List click logic
  const handleList = async (e: any) => {
    e.stopPropagation();
    if (program && signerPublicKey) {
      // Take the promise then pass it to toaster for user feedback on UI

      try {
        const tx = await nft_list({
          program,
          signer: signerPublicKey,
          collectionMint: new PublicKey(collectionAddress),
          makerMint: new PublicKey(nftMintAddress),
          price: 1.5,
        });

        if (tx) {
          const signature = await sendTransaction(tx, connection);
          console.log(signature);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const listPriceRef = useRef<ElementRef<"input">>(null);
  const [listPrice, setListPrice] = useState<number>(0);

  return (
    <Button className="w-full" onClick={handleList}>
      List
    </Button>
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
