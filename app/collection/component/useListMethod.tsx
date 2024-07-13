import { listAsset } from "@/anchor-marketplace/program-methods/list";
import { PROGRAM_ID } from "@/anchor-marketplace/constants";
import { IDL } from "@/idl/anchor_marketplace";
import { AnchorProvider, Program } from "@coral-xyz/anchor";
import {
  useAnchorWallet,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";
import { useMemo } from "react";
import { toast } from "sonner";

const useListMethod = () => {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const anchorWallet = useAnchorWallet();

  const program = useMemo(() => {
    if (anchorWallet) {
      const provider = new AnchorProvider(
        connection,
        anchorWallet,
        AnchorProvider.defaultOptions(),
      );
      return new Program(IDL, PROGRAM_ID, provider);
    }
  }, [connection, anchorWallet]);

  const list = async () => {
    if (program && publicKey) {
      try {
        const tx = await listAsset({
          program,
          signer: publicKey,
          collectionMint,
          makerMint,
          price: 5,
        });
        console.log(tx);
      } catch (error) {
        console.log(error);
        toast.error("An error occured");
      }
    }
  };

  return { listAsset };
};

export default useListMethod;
