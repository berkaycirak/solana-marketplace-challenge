import { PublicKey } from "@solana/web3.js";
import { METADATA_ID, PROGRAM_ID, PROGRAM_NAME } from "../constants";
import { utf8 } from "@coral-xyz/anchor/dist/cjs/utils/bytes";

// Marketplace PDA
const [marketplacePda] = PublicKey.findProgramAddressSync(
  [Buffer.from("marketplace"), utf8.encode(PROGRAM_NAME)],
  PROGRAM_ID,
);

// Listing PDA
const deriveListingPDA = (makerMint: PublicKey) => {
  const [listingPda] = PublicKey.findProgramAddressSync(
    [Uint8Array.from(marketplacePda.toBuffer()), makerMint.toBuffer()],
    PROGRAM_ID,
  );

  return listingPda;
};

// Metadata PDA
const deriveMetadataPDA = (makerMint: PublicKey) => {
  const [metadataPDA] = PublicKey.findProgramAddressSync(
    [Buffer.from("metadata"), METADATA_ID.toBuffer(), makerMint.toBuffer()],
    PROGRAM_ID,
  );

  return metadataPDA;
};

// Reward PDA

const [rewardsMintPDA] = PublicKey.findProgramAddressSync(
  [Buffer.from("rewards"), marketplacePda.toBuffer()],
  PROGRAM_ID,
);

// Treasury PDA

const [treasuryPDA] = PublicKey.findProgramAddressSync(
  [Buffer.from("treasury"), marketplacePda.toBuffer()],
  PROGRAM_ID,
);

const deriveMasterEditionPDA = (makerMint: PublicKey) => {
  const [masterEditionPDA] = PublicKey.findProgramAddressSync(
    [
      Buffer.from("metadata"),
      PROGRAM_ID.toBuffer(),
      makerMint.toBuffer(),
      Buffer.from("edition"),
    ],
    PROGRAM_ID,
  );

  return masterEditionPDA;
};

// Vault PDA created since there is init_if_needed
const [vaultPDA] = PublicKey.findProgramAddressSync([], PROGRAM_ID);

export {
  deriveListingPDA,
  deriveMasterEditionPDA,
  deriveMetadataPDA,
  marketplacePda,
  rewardsMintPDA,
  vaultPDA,
  treasuryPDA,
};
