import { AnchorMarketplace } from "@/idl/anchor_marketplace";
import { BN, Program } from "@coral-xyz/anchor";
import { METADATA_ID, signerWallet } from "../constants";
import {
  deriveListingPDA,
  deriveMetadataPDA,
  deriveMasterEditionPDA,
  marketplacePda,
} from "../program-accounts/pda";
import {
  clusterApiUrl,
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
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

interface NFT_LIST {
  program: MarketplaceProgram;
  signer: PublicKey;
  makerMint: PublicKey;
  collectionMint: PublicKey;
  price: number;
}
// First we need to initialize our program to create accounts
const nft_list = async ({
  program,
  signer,
  makerMint,
  collectionMint,
  price,
}: NFT_LIST) => {
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
  // Find maker ATA account
  console.log(makerMint.toBase58());
  const makerATA = getAssociatedTokenAddressSync(makerMint, signer);
  console.log(makerATA.toBase58());

  // Derive required PDAs which takes makerMint as a param
  const listingPDA = deriveListingPDA(makerMint);

  const vault = getAssociatedTokenAddressSync(makerMint, listingPDA, true);
  const metadataPDA = deriveMetadataPDA(makerMint);
  const masterEditionPDA = deriveMasterEditionPDA(makerMint);
  const keypair = Keypair.fromSecretKey(new Uint8Array(signerWallet));
  const transaction = new Transaction();
  // Get latest blockhash
  // const recentBlockhash = await connection.getLatestBlockhash();

  try {
    //   make an instruction
    const signature = await program.methods
      .list(new BN(price * LAMPORTS_PER_SOL))
      .accounts({
        maker: signer,
        marketplace: marketplacePda,
        makerMint,
        collectionMint: collectionMint,
        makerAta: makerATA,
        vault: vault,
        listing: listingPDA,
        metadata: metadataPDA,
        masterEdition: masterEditionPDA,
        metadataProgram: METADATA_ID,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
      })
      .signers([keypair])
      .rpc();

    console.log(signature);
    // add that instruction into transaction to be signed from wallet

    return transaction;
  } catch (error) {
    console.log(error);
  }
};

export { nft_list };
