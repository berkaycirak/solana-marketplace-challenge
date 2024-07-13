import { AnchorMarketplace } from "@/idl/anchor_marketplace";
import { BN, Program } from "@coral-xyz/anchor";
import { METADATA_ID } from "../constants";
import {
  deriveListingPDA,
  deriveMetadataPDA,
  deriveMasterEditionPDA,
  marketplacePda,
  vaultPDA,
} from "../program-accounts/pda";
import { PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  getAssociatedTokenAddressSync,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { program } from "@coral-xyz/anchor/dist/cjs/native/system";

interface ListAsset {
  program: Program<AnchorMarketplace>;
  signer: PublicKey;
  makerMint: PublicKey;
  collectionMint: PublicKey;
  price: number;
}
// First we need to initialize our program to create accounts
const listAsset = async ({
  program,
  signer,
  makerMint,
  collectionMint,
  price,
}: ListAsset) => {
  // Find maker ATA account
  const makerATA = getAssociatedTokenAddressSync(makerMint, signer);
  //   Derive required PDAs which takes makerMint as a param
  const listingPDA = deriveListingPDA(makerMint);
  const metadataPDA = deriveMetadataPDA(makerMint);
  const masterEditionPDA = deriveMasterEditionPDA(makerMint);

  const transaction = new Transaction();

  try {
    //   make an instruction
    const instruction = await program.methods
      .list(BN(price))
      .accounts({
        maker: signer,
        marketplace: marketplacePda,
        makerMint,
        collectionMint,
        makerAta: makerATA,
        vault: vaultPDA,
        listing: listingPDA,
        metadata: metadataPDA,
        masterEdition: masterEditionPDA,
        metadataProgram: METADATA_ID,
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

export { listAsset };
