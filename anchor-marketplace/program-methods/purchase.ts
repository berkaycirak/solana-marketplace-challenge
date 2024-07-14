import { AnchorMarketplace } from "@/idl/anchor_marketplace";
import { Program } from "@coral-xyz/anchor";

import {
  deriveListingPDA,
  marketplacePda,
  rewardsMintPDA,
  treasuryPDA,
  vaultPDA,
} from "../program-accounts/pda";
import { PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  getAssociatedTokenAddressSync,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { MarketplaceProgram } from "@/types";

interface NFT_LIST {
  program: MarketplaceProgram;
  signer: PublicKey;
  sellerMint: PublicKey;
  seller: PublicKey;
}
// First we need to initialize our program to create accounts
const purchase_nft = async ({
  program,
  signer,
  sellerMint,
  seller,
}: NFT_LIST) => {
  //   Derive required PDAs which takes makerMint as a param
  const listingPDA = deriveListingPDA(sellerMint);

  //   Find takerATA
  const takerAta = getAssociatedTokenAddressSync(sellerMint, signer);

  const transaction = new Transaction();

  try {
    //   make an instruction
    const instruction = await program.methods
      .purchase()
      .accounts({
        taker: signer,
        maker: seller,
        makerMint: sellerMint,
        marketplace: marketplacePda,
        takerAta,
        vault: vaultPDA,
        rewards: rewardsMintPDA,
        listing: listingPDA,
        treasury: treasuryPDA,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
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

export { purchase_nft };
