import { AnchorMarketplace } from "@/idl/anchor_marketplace";
import { Program } from "@coral-xyz/anchor";

import {
  deriveListingPDA,
  marketplacePda,
  vaultPDA,
} from "../program-accounts/pda";
import {
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import {
  getAssociatedTokenAddressSync,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { MarketplaceProgram } from "@/types";
import { signerWallet } from "../constants";

interface NFT_LIST {
  program: MarketplaceProgram;
  signer: PublicKey;
  ownerMint: PublicKey;
  owner: PublicKey;
}

// First we need to initialize our program to create accounts
const delist_nft = async ({ program, signer, ownerMint, owner }: NFT_LIST) => {
  //   Derive required PDAs which takes makerMint as a param
  const listingPDA = deriveListingPDA(ownerMint);
  //   Find takerATA
  const ownerATA = getAssociatedTokenAddressSync(ownerMint, signer);

  const transaction = new Transaction();

  try {
    const signerWT = Keypair.fromSecretKey(new Uint8Array(signerWallet));
    //   make an instruction
    const signature = await program.methods
      .delist()
      .accounts({
        maker: owner,
        marketplace: marketplacePda,
        makerMint: ownerMint,
        makerAta: ownerATA,
        listing: listingPDA,
        vault: vaultPDA,
        systemProgram: SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
      })
      .signers([signerWT])
      .rpc();
    // add that instruction into transaction to be signed from wallet
    console.log(signature);
    return transaction;
  } catch (error) {
    console.log(error);
  }
};

export { delist_nft };
