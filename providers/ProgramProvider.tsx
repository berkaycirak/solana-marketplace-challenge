"use client";

import { program_pk } from "@/constants";
import { AnchorMarketplace, IDL } from "@/idl/anchor_marketplace";
import { AnchorProvider, Program } from "@coral-xyz/anchor";
import { AnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import { clusterApiUrl, Connection } from "@solana/web3.js";
import React, { createContext, useContext } from "react";

const ProgramContext = createContext<Program<AnchorMarketplace> | null>(null);

export const ProgramProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
  const wallet = useWallet();
  const provider = new AnchorProvider(connection, wallet as AnchorWallet, {
    commitment: "confirmed",
  });
  const program = new Program<AnchorMarketplace>(IDL, program_pk, provider);

  return (
    <ProgramContext.Provider value={program}>
      {children}
    </ProgramContext.Provider>
  );
};

export const useProgramContext = () => useContext(ProgramContext);
