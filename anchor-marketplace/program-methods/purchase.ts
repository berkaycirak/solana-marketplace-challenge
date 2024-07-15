import { AnchorMarketplace } from "@/idl/anchor_marketplace";
import { Program } from "@coral-xyz/anchor";

import {
  deriveListingPDA,
  marketplacePda,
  rewardsMintPDA,
  treasuryPDA,
} from "../program-accounts/pda";
import {
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  getAssociatedTokenAddressSync,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { MarketplaceProgram } from "@/types";
import { walletArray } from "../constants";

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
  // Generate Vault Address
  const vault = getAssociatedTokenAddressSync(sellerMint, listingPDA, true);
  const transaction = new Transaction();

  console.log(treasuryPDA.toBase58());

  try {
    //   make an instruction
    const buyIx = await program.methods
      .purchase()
      .accounts({
        taker: signer,
        maker: seller,
        makerMint: sellerMint,
        marketplace: marketplacePda,
        takerAta,
        vault,
        rewards: rewardsMintPDA,
        listing: listingPDA,
        treasury: treasuryPDA,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
      })
      .instruction();

    // add that instruction into transaction to be signed from wallet
    transaction.add(buyIx);
    return transaction;
  } catch (error) {
    console.log(error);
  }
};

export { purchase_nft };
