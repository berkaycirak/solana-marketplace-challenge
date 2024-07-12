import { program_pk } from "@/constants";
import { utf8 } from "@coral-xyz/anchor/dist/cjs/utils/bytes";

import {
  clusterApiUrl,
  Connection,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  getAssociatedTokenAddress,
} from "@solana/spl-token";

import { base58ToUint8 } from "@/utils/base58ToUint8";
import { AnchorProvider, BN, Program } from "@coral-xyz/anchor";
import { AnchorMarketplace } from "@/idl/anchor_marketplace";

export const listAsset = async (
  signer: string,
  program: Program<AnchorMarketplace>,
) => {
  const CPT_address = "BLZZjhv3vPJCktBtZ6yxHXm5zvXBCQj489aPdgAJz4xj";
  const metadataProgramAddress = "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
  // Marketplace PDA
  const [marketplacePda] = PublicKey.findProgramAddressSync(
    [Buffer.from("marketplace"), utf8.encode("Berkay")],
    program_pk,
  );

  // Listing PDA
  const makerMintSeed = base58ToUint8(CPT_address);
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

  // Vault PDA created since there is init_if_needed
  const [vault] = PublicKey.findProgramAddressSync([], program_pk);

  // Maker ATA
  const makerATA = await getAssociatedTokenAddress(
    new PublicKey(CPT_address),
    new PublicKey(signer),
  );

  // Marketplace Account
  const marketplaceAccount =
    await program.account.marketplace.fetch(marketplacePda);
  console.log("Marketplace Account:", marketplaceAccount);

  // const listingAccount = await program.account.listing.fetch(listingPda);

  const transaction = new Transaction();

  const listTx = await program.methods
    .list(new BN(0.005))
    .accounts({
      maker: signer,
      marketplace: marketplacePda.toBase58(),
      makerMint: CPT_address,
      collectionMint: signer,
      vault: vault.toBase58(),
      metadata: metadata.toBase58(),
      metadataProgram: metadataProgramAddress,
      makerAta: makerATA.toBase58(),
      listing: listingPda.toBase58(),
      associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID.toBase58(),
      systemProgram: SystemProgram.programId.toBase58(),
    })
    .instruction();

  transaction.add(listTx);

  return transaction;
};
