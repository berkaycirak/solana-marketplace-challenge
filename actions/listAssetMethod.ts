import { program_pk } from "@/constants";
import { utf8 } from "@coral-xyz/anchor/dist/cjs/utils/bytes";
import {
  clusterApiUrl,
  Connection,
  Keypair,
  PublicKey,
  SystemProgram,
} from "@solana/web3.js";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  createInitializeMintInstruction,
  getAssociatedTokenAddress,
  getOrCreateAssociatedTokenAccount,
} from "@solana/spl-token";
import { mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";

import { base58ToUint8 } from "@/utils/base58ToUint8";

import { BN, Program } from "@coral-xyz/anchor";
import { AnchorMarketplace } from "@/idl/anchor_marketplace";

export const listAssetMethod = async (
  signer: PublicKey,
  program: Program<AnchorMarketplace>,
) => {
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
  // CPT Token Mint address that I want to use in marketplace as a token for transactions
  const CPT_address = "BLZZjhv3vPJCktBtZ6yxHXm5zvXBCQj489aPdgAJz4xj";
  const metadataProgramAddress = "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s";
  // NFT address
  const collectionMint = "Gz2jyXr1ZBDcurM2XxG7tJpqv5YxbedLueitZZhxa1MF";
  const nft_ata = '"HHCmf3znzC2SVXRVWsYjJdjgFx8QFYPCaXBJzEoc8B3W';
  // Marketplace PDA
  const [marketplacePda] = PublicKey.findProgramAddressSync(
    [Buffer.from("marketplace"), utf8.encode("Berkay")],
    program_pk,
  );

  // Listing PDA
  const makerMintSeed = base58ToUint8(signer.toBase58());
  const [listingPda] = PublicKey.findProgramAddressSync(
    [Uint8Array.from(marketplacePda.toBuffer()), makerMintSeed],
    program_pk,
  );

  // Metadata PDA
  const metadataProgramSeed = base58ToUint8(metadataProgramAddress);
  const [metadata] = PublicKey.findProgramAddressSync(
    [Buffer.from("metadata"), metadataProgramSeed, makerMintSeed],
    program_pk,
  );
  console.log(metadata.toBase58());

  // Vault PDA created since there is init_if_needed
  const [vault] = PublicKey.findProgramAddressSync([], program_pk);

  // Maker ATA
  const makerATA = await getAssociatedTokenAddress(
    new PublicKey(CPT_address),
    signer,
  );

  // Master Edition PDA
  const [masterEdition] = PublicKey.findProgramAddressSync(
    [
      Buffer.from("metadata"),
      metadataProgramSeed,
      makerMintSeed,
      Buffer.from("edition"),
    ],
    program_pk,
  );

  // Marketplace Account
  const marketplaceAccount =
    await program.account.marketplace.fetch(marketplacePda);
  console.log("Marketplace Account:", marketplaceAccount);

  // const listingAccount = await program.account.listing.fetch(listingPda);

  const tx = program.methods
    .list(new BN(5))
    .accounts({
      marketplace: marketplacePda,
      makerMint: new PublicKey(CPT_address),
      collectionMint: new PublicKey(collectionMint),
      masterEdition: masterEdition,
      vault: vault,
      metadata: metadata,
      makerAta: makerATA,
      listing: listingPda,
      metadataProgram: new PublicKey(metadataProgramAddress),
      associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
    })
    .rpc();

  return tx;
};
