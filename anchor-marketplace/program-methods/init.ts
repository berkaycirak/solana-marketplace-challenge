import { AnchorMarketplace } from "@/idl/anchor_marketplace";
import { Program } from "@coral-xyz/anchor";
import { PROGRAM_NAME } from "../constants";
import {
  marketplacePda,
  rewardsMintPDA,
  treasuryPDA,
} from "../program-accounts/pda";
import { PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { MarketplaceProgram } from "@/types";

const predeterminedFee = 0.00001;

// First we need to initialize our program to create accounts
const initializeProgram = async (
  program: MarketplaceProgram,
  admin: PublicKey,
) => {
  const transaction = new Transaction();

  try {
    //   make an instruction
    const instruction = await program.methods
      .initialize(PROGRAM_NAME, predeterminedFee)
      .accounts({
        admin,
        marketplace: marketplacePda,
        rewardsMint: rewardsMintPDA,
        treasury: treasuryPDA,
        systemProgram: SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
      })
      .instruction();
    // add that instruction into transaction to be signed from wallet
    transaction.add(instruction);
    return transaction;
  } catch (error) {
    console.log(error);
  }
};

export { initializeProgram };
