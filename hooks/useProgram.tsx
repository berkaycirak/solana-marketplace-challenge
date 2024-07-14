import { PROGRAM_ID } from "@/anchor-marketplace/constants";
import { IDL } from "@/idl/anchor_marketplace";
import { AnchorProvider, Program } from "@coral-xyz/anchor";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import React, { useMemo } from "react";
import { toast } from "sonner";

// That hook returns program based on AnchorProvider
const useProgram = () => {
  const { connection } = useConnection();
  const anchorWallet = useAnchorWallet();

  const program = useMemo(() => {
    if (anchorWallet) {
      const provider = new AnchorProvider(
        connection,
        anchorWallet,
        AnchorProvider.defaultOptions(),
      );
      return new Program(IDL, PROGRAM_ID, provider);
    } else {
      toast.error("Connect Wallet please!");
    }
  }, [connection, anchorWallet]);

  return program;
};

export default useProgram;
