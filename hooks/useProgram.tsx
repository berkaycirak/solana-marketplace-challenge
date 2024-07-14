import { PROGRAM_ID } from "@/anchor-marketplace/constants";
import { IDL } from "@/idl/anchor_marketplace";
import { AnchorProvider, Program } from "@coral-xyz/anchor";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { clusterApiUrl, Connection } from "@solana/web3.js";
import React, { useMemo } from "react";
import { toast } from "sonner";

// That hook returns program based on AnchorProvider
const useProgram = () => {
  const anchorWallet = useAnchorWallet();
  const { connection } = useConnection();

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
  }, [anchorWallet, connection]);

  return program;
};

export default useProgram;
