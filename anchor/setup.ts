import { Program } from "@coral-xyz/anchor";
import { AnchorMarketplace, IDL } from "@/idl/anchor_marketplace";
import { clusterApiUrl, Connection } from "@solana/web3.js";
import { program_pk } from "@/constants";

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

export const program = new Program<AnchorMarketplace>(IDL, program_pk, {
  connection,
});
