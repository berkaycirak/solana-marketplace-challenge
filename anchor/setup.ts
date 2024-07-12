import { IdlAccounts, Program } from "@coral-xyz/anchor";
import { AnchorMarketplace, IDL } from "@/idl/anchor_marketplace";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import { program_pk } from "@/constants";
import { useAnchorWallet } from "@solana/wallet-adapter-react";

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

// Initialize the program interface with the IDL, program ID, and connection.
// This setup allows us to interact with the on-chain program using the defined interface.
export const program = new Program<AnchorMarketplace>(IDL, program_pk, {
  connection,
});

//
